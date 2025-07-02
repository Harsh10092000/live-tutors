import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log('No session found in livetutors');
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Session found in livetutors:', session);

    // Get the latest valid session token from database for this user
    const [sessionRows] = await pool.query(
      'SELECT session_token, access_token, expires FROM sessions WHERE user_id = ? AND expires > NOW() ORDER BY created_at DESC LIMIT 1',
      [session.user.id]
    );

    if (!sessionRows.length) {
      console.log('No valid session found for user:', session.user.id);
      return Response.json({ error: 'Session expired' }, { status: 401 });
    }

    const sessionToken = sessionRows[0].session_token;
    const accessToken = sessionRows[0].access_token;
    const expires = sessionRows[0].expires;

    console.log('Valid session found, expires at:', expires);

    console.log('Session tokens from database:', { sessionToken, accessToken });

    const responseData = {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone
      },
      token: sessionToken || accessToken,
      accessToken: accessToken,
      expires: expires.toISOString()
    };

    console.log('Sending session data to dashboard:', responseData);

    return Response.json(responseData);

  } catch (error) {
    console.error('Session error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 