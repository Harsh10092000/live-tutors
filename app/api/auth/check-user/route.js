import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const [rows] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    return NextResponse.json({ exists: rows.length > 0 });
  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { error: 'Failed to check user' },
      { status: 500 }
    );
  }
} 