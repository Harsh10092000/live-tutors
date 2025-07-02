import pool from '../db';
import crypto from 'crypto';

function generateId(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

export default function MySQLAdapter() {
  return {
    async createSession(data) {
      try {
        const sessionToken = generateId();
        const accessToken = generateId();
        
        await pool.query(
          'INSERT INTO sessions (id, session_token, user_id, expires, access_token) VALUES (?, ?, ?, ?, ?)',
          [generateId(), sessionToken, data.userId, data.expires, accessToken]
        );

        return {
          sessionToken,
          userId: data.userId,
          expires: data.expires
        };
      } catch (error) {
        console.error('Create session error:', error);
        throw error;
      }
    },

    async getSession(sessionToken) {
      try {
        const [rows] = await pool.query(
          `SELECT s.*, u.email, u.name 
           FROM sessions s 
           JOIN users u ON s.user_id = u.id 
           WHERE s.session_token = ? AND s.expires > NOW()`,
          [sessionToken]
        );
        
        if (!rows[0]) return null;

        return {
          sessionToken: rows[0].session_token,
          userId: rows[0].user_id.toString(),
          expires: rows[0].expires,
          user: {
            id: rows[0].user_id.toString(),
            email: rows[0].email,
            name: rows[0].name
          }
        };
      } catch (error) {
        console.error('Get session error:', error);
        throw error;
      }
    },

    async updateSession(data) {
      try {
        await pool.query(
          'UPDATE sessions SET expires = ? WHERE session_token = ?',
          [data.expires, data.sessionToken]
        );
        return data;
      } catch (error) {
        console.error('Update session error:', error);
        throw error;
      }
    },

    async deleteSession(sessionToken) {
      try {
        await pool.query(
          'DELETE FROM sessions WHERE session_token = ?',
          [sessionToken]
        );
        return null;
      } catch (error) {
        console.error('Delete session error:', error);
        throw error;
      }
    },

    async createUser(data) {
      try {
        const [result] = await pool.query(
          'INSERT INTO users (email, name, phone) VALUES (?, ?, ?)',
          [data.email, data.name, data.phone]
        );
        return {
          id: result.insertId.toString(),
          ...data
        };
      } catch (error) {
        console.error('Create user error:', error);
        throw error;
      }
    },

    async getUser(id) {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM users WHERE id = ?',
          [id]
        );
        if (!rows[0]) return null;
        return {
          ...rows[0],
          id: rows[0].id.toString()
        };
      } catch (error) {
        console.error('Get user error:', error);
        throw error;
      }
    },

    async getUserByEmail(email) {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM users WHERE email = ?',
          [email]
        );
        if (!rows[0]) return null;
        return {
          ...rows[0],
          id: rows[0].id.toString()
        };
      } catch (error) {
        console.error('Get user by email error:', error);
        throw error;
      }
    },

    async updateUser(data) {
      try {
        await pool.query(
          'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
          [data.name, data.email, data.phone, data.id]
        );
        return data;
      } catch (error) {
        console.error('Update user error:', error);
        throw error;
      }
    },

    async deleteUser(userId) {
      try {
        await pool.query(
          'DELETE FROM users WHERE id = ?',
          [userId]
        );
        return null;
      } catch (error) {
        console.error('Delete user error:', error);
        throw error;
      }
    },

    // These methods are required by the adapter spec but not used in our case
    async linkAccount() { return null; },
    async unlinkAccount() { return null; },
    async getUserByAccount() { return null; }
  };
} 