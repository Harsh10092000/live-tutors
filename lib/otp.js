import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate OTP
export function generateOTP() {
  // Generate a 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated new OTP:', otp);
  return otp;
}

// Send OTP via email
export async function sendOTPEmail(email, otp) {
  console.log('Sending OTP email:', {
    to: email,
    otp: otp
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Login OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your Login OTP</h2>
        <p>Your one-time password is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw error;
  }
} 