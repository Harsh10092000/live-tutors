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
    
    const [rows] = await db.query(
      `SELECT id, transaction_type AS type, coins_amount AS amount, usd_amount AS usdAmount, currency, status, created_at AS date, description
       FROM coin_transactions WHERE user_id = ? ORDER BY id DESC LIMIT 50`,
      [userId]
    );
    
    return NextResponse.json({ transactions: rows || [] });
  } catch (e) {
    console.error('Wallet transactions error:', e);
    return NextResponse.json({ transactions: [] });
  }
}


