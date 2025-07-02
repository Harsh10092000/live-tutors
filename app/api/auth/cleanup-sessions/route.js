import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    // Delete expired sessions
    const [result] = await pool.query(
      'DELETE FROM sessions WHERE expires < NOW()'
    );

    console.log(`Cleaned up ${result.affectedRows} expired sessions`);

    return NextResponse.json({ 
      message: `Cleaned up ${result.affectedRows} expired sessions`,
      cleanedCount: result.affectedRows
    });

  } catch (error) {
    console.error('Session cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup sessions' },
      { status: 500 }
    );
  }
} 