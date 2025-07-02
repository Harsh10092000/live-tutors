import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/db';
import { generateOTP, sendOTPEmail } from '@/lib/otp';
import crypto from 'crypto';

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        phone: { label: "Phone", type: "tel" },
        name: { label: "Name", type: "text" },
        otp: { label: "OTP", type: "text" },
        isNewUser: { label: "Is New User", type: "boolean" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.otp) {
            throw new Error('Email and OTP are required');
          }

          console.log('Verifying OTP:', {
            email: credentials.email,
            otp: credentials.otp
          });

          // Get the latest unused OTP for this email
          const [otpRows] = await pool.query(
            `SELECT * FROM otps 
             WHERE email = ? 
             AND otp = ? 
             AND expires_at > NOW() 
             AND used = 0
             ORDER BY created_at DESC 
             LIMIT 1`,
            [credentials.email, credentials.otp]
          );

          console.log('Found OTP rows:', otpRows);

          if (!otpRows.length) {
            console.log('No valid OTP found');
            throw new Error('Invalid or expired OTP');
          }

          // Mark OTP as used
          await pool.query(
            'UPDATE otps SET used = 1 WHERE id = ?',
            [otpRows[0].id]
          );

          // Check if user exists
          let [userRows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );

          let user;
          if (!userRows.length) {
            // This is a new user
            if (!credentials.name || !credentials.phone) {
              throw new Error('Name and phone number are required for new users');
            }

            console.log('Creating new user:', {
              email: credentials.email,
              name: credentials.name,
              phone: credentials.phone
            });

            // Create new user
            const [result] = await pool.query(
              'INSERT INTO users (email, phone, name) VALUES (?, ?, ?)',
              [credentials.email, credentials.phone, credentials.name]
            );
            
            [userRows] = await pool.query(
              'SELECT * FROM users WHERE id = ?',
              [result.insertId]
            );
            user = userRows[0];
          } else {
            user = userRows[0];
            
            // Update existing user's info if provided
            // if (credentials.name || credentials.phone) {
            //   await pool.query(
            //     'UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?',
            //     [credentials.name || null, credentials.phone || null, user.id]
            //   );
            // }
          }

          // Save session in database
          const sessionToken = crypto.randomBytes(32).toString('hex');
          const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

          await pool.query(
            'INSERT INTO sessions (id, session_token, user_id, expires, access_token) VALUES (?, ?, ?, ?, ?)',
            [crypto.randomBytes(32).toString('hex'), sessionToken, user.id, expires, sessionToken]
          );

          console.log('Authentication successful for user:', {
            id: user.id,
            email: user.email
          });

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            phone: user.phone,
            sessionToken: sessionToken
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phone = user.phone;
        token.sessionToken = user.sessionToken;  // Include sessionToken in JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.token = token.sessionToken;  // Include sessionToken in session
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this',
  debug: true
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 


