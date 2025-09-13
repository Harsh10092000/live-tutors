import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    
    // Use transaction to prevent race conditions
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      
      // Lock the row to prevent race conditions
      const [existingWallet] = await conn.query('SELECT id FROM user_wallets WHERE user_id = ? FOR UPDATE', [userId]);
      
      // Only create wallet if it doesn't exist
      if (!existingWallet.length) {
        await conn.query('INSERT INTO user_wallets (user_id, coin_balance, total_coins_purchased, total_coins_spent) VALUES (?, 0, 0, 0)', [userId]);
      }
      
      // Get wallet data
      const [rows] = await conn.query('SELECT coin_balance AS balance, total_coins_purchased AS totalPurchased, total_coins_spent AS totalSpent FROM user_wallets WHERE user_id = ? LIMIT 1', [userId]);
      const data = rows?.[0] || { balance: 0, totalPurchased: 0, totalSpent: 0 };
      
      await conn.commit();
      return NextResponse.json(data);
    } catch (error) {
      await conn.rollback();
      console.error('Wallet summary error:', error);
      throw error;
    } finally {
      conn.release();
    }
  } catch (e) {
    console.error('Wallet summary error:', e);
    return NextResponse.json({ balance: 0, totalPurchased: 0, totalSpent: 0 });
  }
}


