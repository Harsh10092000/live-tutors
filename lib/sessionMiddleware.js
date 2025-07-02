import pool from '@/lib/db';

export async function checkSessionExpiry(userId) {
  try {
    // Check if user has any valid sessions
    const [sessionRows] = await pool.query(
      'SELECT COUNT(*) as count FROM sessions WHERE user_id = ? AND expires > NOW()',
      [userId]
    );

    if (sessionRows[0].count === 0) {
      // No valid sessions found, clean up expired sessions
      await pool.query(
        'DELETE FROM sessions WHERE user_id = ? AND expires < NOW()',
        [userId]
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('Session expiry check error:', error);
    return false;
  }
}

export async function cleanupExpiredSessions() {
  try {
    const [result] = await pool.query(
      'DELETE FROM sessions WHERE expires < NOW()'
    );
    
    console.log(`Cleaned up ${result.affectedRows} expired sessions`);
    return result.affectedRows;
  } catch (error) {
    console.error('Session cleanup error:', error);
    return 0;
  }
} 