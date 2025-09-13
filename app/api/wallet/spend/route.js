import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const amount = Number(body?.amount || 0)
    const reason = String(body?.reason || '')
    const meta = body?.meta || null
    const jobId = body?.jobId || null

    if (amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const userId = session.user.id
    const conn = await db.getConnection()
    try {
      await conn.beginTransaction()

      // If this is a contact request (jobId provided), handle it specially
      if (jobId) {
        // Get job details and verify job exists
        const [jobRows] = await conn.query(
          'SELECT id, user_id as job_poster_id, subjects, city, location, url FROM tutor_requests WHERE id = ?',
          [jobId]
        );
        
        if (!jobRows.length) {
          await conn.rollback();
          return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        const job = jobRows[0];
        const displayTitle = job?.subjects
          ? `${job.subjects} in ${job.city || job.location || ''}`.trim()
          : 'this request';
        
        // Check if user is trying to contact themselves
        if (String(userId) === String(job.job_poster_id)) {
          await conn.rollback();
          return NextResponse.json({ error: 'Cannot contact yourself' }, { status: 400 });
        }

        // Check if contact request already exists
        const [existingRequest] = await conn.query(
          'SELECT id FROM contact_requests WHERE job_id = ? AND requester_id = ? AND status IN ("pending", "approved")',
          [jobId, userId]
        );
        
        if (existingRequest.length > 0) {
          await conn.rollback();
          return NextResponse.json({ error: 'Contact request already exists for this job' }, { status: 400 });
        }
      }

      const [rows] = await conn.query('SELECT coin_balance FROM user_wallets WHERE user_id = ? FOR UPDATE', [userId])
      const current = Number(rows?.[0]?.coin_balance || 0)
      if (current < amount) {
        await conn.rollback()
        return NextResponse.json({ success: false, error: 'Insufficient balance' }, { status: 400 })
      }

      await conn.query('UPDATE user_wallets SET coin_balance = coin_balance - ?, total_coins_spent = total_coins_spent + ? WHERE user_id = ?', [amount, amount, userId])
      
      // Insert transaction
      const [transactionResult] = await conn.query(
        `INSERT INTO coin_transactions (user_id, transaction_type, coins_amount, usd_amount, currency, status, description)
         VALUES (?, 'spend', ?, NULL, 'USD', 'completed', ?)`,
        [userId, amount, reason || 'Contact request']
      );

      const transactionId = transactionResult.insertId;

      // If this is a contact request, create the contact request record
      if (jobId) {
        const [jobRows] = await conn.query(
          'SELECT id, user_id as job_poster_id, subjects, city, location, url FROM tutor_requests WHERE id = ?',
          [jobId]
        );
        const job = jobRows[0];
        const displayTitle = job?.subjects
          ? `${job.subjects} in ${job.city || job.location || ''}`.trim()
          : 'this request';

        // Create contact request
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

        const [contactRequestResult] = await conn.query(
          'INSERT INTO contact_requests (job_id, requester_id, job_poster_id, coins_spent, transaction_id, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
          [jobId, userId, job.job_poster_id, amount, transactionId, expiresAt]
        );

        const contactRequestId = contactRequestResult.insertId;

        // Update transaction with contact request ID
        await conn.query(
          'UPDATE coin_transactions SET contact_request_id = ? WHERE id = ?',
          [contactRequestId, transactionId]
        );

        // Create notification for job poster
        await conn.query(
          'INSERT INTO notifications (user_id, type, title, message, link, is_read) VALUES (?, ?, ?, ?, ?, ?)',
          [
            job.job_poster_id,
            'contact_request',
            'New Contact Request',
            `Someone wants to contact you about "${displayTitle}". Click to review.`,
            `/tutor-jobs/${job.url}`,
            0
          ]
        );

        await conn.commit()
        return NextResponse.json({ 
          success: true, 
          message: 'Contact request sent successfully!',
          contactRequestId,
          expiresAt: expiresAt.toISOString()
        });
      } else {
        // Regular coin spend (not contact request)
        await conn.commit()
        return NextResponse.json({ success: true })
      }
    } catch (e) {
      await conn.rollback()
      return NextResponse.json({ error: 'Transaction failed' }, { status: 500 })
    } finally {
      conn.release()
    }
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


