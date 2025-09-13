import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query(
      'SELECT id, coins, usd_price AS usdPrice, discount_pct AS discountPct, is_popular AS isPopular FROM coin_packages WHERE is_active = 1 ORDER BY coins ASC'
    );

    return NextResponse.json({ packages: rows || [] });
  } catch (error) {
    console.error('Failed to load coin packages:', error);
    return NextResponse.json({ packages: [] }, { status: 200 });
  }
}


