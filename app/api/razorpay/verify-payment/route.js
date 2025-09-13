import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db, { poolLogs } from '@/lib/db';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Check if Razorpay is properly configured
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, coins, userId, amount, currency } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !coins || !userId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // log security anomaly
      try { await poolLogs.query('INSERT INTO security_logs (user_id, category, rzp_order_id, rzp_payment_id, description, metadata) VALUES (?,?,?,?,?, JSON_OBJECT("ip", ?, "ua", ?))', [userId || null, 'signature_fail', razorpay_order_id, razorpay_payment_id, 'Signature mismatch', request.headers.get('x-forwarded-for') || null, request.headers.get('user-agent') || null]); } catch {}
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Load our order snapshot
    const [orderRows] = await db.query('SELECT * FROM orders WHERE rzp_order_id = ? LIMIT 1', [razorpay_order_id]);
    if (!orderRows.length) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const order = orderRows[0];

    // Compare received amount to expected
    const receivedMinor = Number(amount); // amount from client is already minor units per your changes
    if (receivedMinor !== Number(order.expected_minor_amount) || currency !== order.expected_currency || Number(coins) !== Number(order.expected_coins)) {
      try { await poolLogs.query('INSERT INTO security_logs (user_id, category, rzp_order_id, rzp_payment_id, description, metadata) VALUES (?,?,?,?,?, JSON_OBJECT("expected_minor", ?, "got_minor", ?, "expected_curr", ?, "got_curr", ?, "expected_coins", ?, "got_coins", ?))', [order.user_id, 'amount_mismatch', razorpay_order_id, razorpay_payment_id, 'Expected vs received mismatch', order.expected_minor_amount, receivedMinor, order.expected_currency, currency, order.expected_coins, coins]); } catch {}
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
    }

    // Atomic wallet crediting with idempotency
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Ensure not already paid
      const [freshOrders] = await conn.query('SELECT status FROM orders WHERE rzp_order_id = ? FOR UPDATE', [razorpay_order_id]);
      if (!freshOrders.length) throw new Error('Order disappeared');
      if (freshOrders[0].status === 'paid') {
        await conn.rollback();
        return NextResponse.json({ success: true, message: 'Already processed' });
      }

      // Lock wallet row
      await conn.query('SELECT id FROM user_wallets WHERE user_id = ? FOR UPDATE', [order.user_id]);

      // Insert coin transaction (idempotent by unique key on payment id)
      await conn.query(
        `INSERT INTO coin_transactions (user_id, transaction_type, coins_amount, usd_amount, currency, exchange_rate, razorpay_payment_id, razorpay_order_id, status, description)
         VALUES (?, 'purchase', ?, ?, ?, ?, ?, ?, 'completed', 'Coin purchase via Razorpay')
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [order.user_id, order.expected_coins, order.expected_usd_price, order.expected_currency, order.expected_exchange_rate, razorpay_payment_id, razorpay_order_id]
      );

      // Check if wallet exists first
      const [existingWallet] = await conn.query('SELECT id FROM user_wallets WHERE user_id = ? LIMIT 1', [order.user_id]);
      
      // Only create wallet if it doesn't exist
      if (!existingWallet.length) {
        await conn.query('INSERT INTO user_wallets (user_id, coin_balance, total_coins_purchased, total_coins_spent) VALUES (?, 0, 0, 0)', [order.user_id]);
      }

      // Update wallet balances
      await conn.query('UPDATE user_wallets SET coin_balance = coin_balance + ?, total_coins_purchased = total_coins_purchased + ? WHERE user_id = ?', [order.expected_coins, order.expected_coins, order.user_id]);

      // Mark order as paid
      await conn.query('UPDATE orders SET status = "paid", updated_at = CURRENT_TIMESTAMP WHERE rzp_order_id = ?', [razorpay_order_id]);

      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    // Log credit success
    try { await poolLogs.query('INSERT INTO event_logs (user_id, module, action, entity_type, entity_id, severity, message, metadata) VALUES (?,?,?,?,?, "info", ?, JSON_OBJECT("coins", ?, "currency", ?, "minor", ?))', [order.user_id, 'wallet', 'credit_success', 'order', razorpay_order_id, 'Wallet credited after payment', order.expected_coins, order.expected_currency, order.expected_minor_amount]); } catch {}

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
