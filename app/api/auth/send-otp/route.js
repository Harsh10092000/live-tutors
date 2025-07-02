import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { generateOTP, sendOTPEmail } from '@/lib/otp';

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log('Saving OTP:', {
      email,
      otp,
      expiresAt
    });

    // Save OTP to database
    await pool.query(
      'INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)',
      [email, otp, expiresAt]
    );

    // For development, log the OTP
    console.log('Generated OTP for testing:', otp);

    // Send OTP via email
    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
      message: 'OTP sent successfully',
      // Include OTP in development mode
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 