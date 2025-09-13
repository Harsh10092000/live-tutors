import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import db, { poolLogs } from '@/lib/db';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Check if Razorpay credentials are available
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('Razorpay credentials are missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    // Check if Razorpay is properly configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const { amount, currency, coins, userId } = await request.json();

    if (!amount || !currency || !coins || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate package from DB: choose the exact package by coins
    const [pkgRows] = await db.query('SELECT id, coins, usd_price AS usdPrice, discount_pct AS discountPct FROM coin_packages WHERE is_active = 1 AND coins = ? LIMIT 1', [coins]);
    if (!pkgRows.length) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }
    const pkg = pkgRows[0];
    const usdPrice = Number(pkg.usdPrice);
    const discountPct = Number(pkg.discountPct || 0);
    const finalUsd = +(usdPrice - (usdPrice * discountPct) / 100).toFixed(2);

    // Snapshot exchange rate
    const [rateRows] = await db.query('SELECT rate_to_usd FROM exchange_rates_cache WHERE currency = ? LIMIT 1', [currency]);
    const rate = rateRows?.[0]?.rate_to_usd ? Number(rateRows[0].rate_to_usd) : 1;

    // Calculate expected amount in minor units
    const expectedInCurrency = currency === 'USD' ? finalUsd : +(finalUsd * rate).toFixed(2);
    const expectedMinorAmount = Math.round(amount * 100);

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: expectedMinorAmount,
      currency: currency,
      receipt: `coins_${pkg.id}_${userId}_${Date.now()}`,
      notes: {
        packageId: pkg.id.toString(),
        coins: pkg.coins.toString(),
        userId: userId.toString(),
        type: 'coin_purchase'
      }
    });

    // Persist order snapshot for secure verification
    await db.query(
      `INSERT INTO orders (user_id, package_id, rzp_order_id, expected_currency, expected_usd_price, expected_exchange_rate, expected_minor_amount, expected_coins, status, meta)
       VALUES (?,?,?,?,?,?,?,?, 'created', JSON_OBJECT('discountPct', ?, 'computedFinalUsd', ?, 'requestedAmountMain', ?))
       ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
      [userId, pkg.id, order.id, currency, usdPrice, rate, expectedMinorAmount, pkg.coins, discountPct, finalUsd, amount]
    );

    // Log order created into logs DB (best-effort)
    try {
      const ip = request.headers.get('x-forwarded-for') || null;
      const ua = request.headers.get('user-agent') || null;
      await poolLogs.query(
        'INSERT INTO payment_audit_logs (user_id, rzp_order_id, event_type, signature_ok, expected_minor_amount, currency, notes, raw_payload) VALUES (?,?,?,?,?,?, JSON_OBJECT("packageId", ?, "coins", ?, "rate", ?, "finalUsd", ?), NULL)'
        , [userId, order.id, 'order_created', null, expectedMinorAmount, currency, pkg.id, pkg.coins, rate, finalUsd]
      );
      await poolLogs.query(
        'INSERT INTO event_logs (user_id, module, action, entity_type, entity_id, severity, message, metadata, ip, user_agent) VALUES (?,?,?,?,?,"info",?, JSON_OBJECT("coins", ?, "minor", ?, "currency", ?), ?, ?)'
        , [userId, 'payments', 'order_created', 'rzp_order', order.id, 'Razorpay order created', pkg.coins, expectedMinorAmount, currency, ip, ua]
      );
    } catch {}

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
