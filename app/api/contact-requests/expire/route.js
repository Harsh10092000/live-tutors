import { NextResponse } from 'next/server'
import db from '@/lib/db'

// POST - Process expired contact requests (auto-refund)
export async function POST(request) {
  try {
    const conn = await db.getConnection()
    try {
      await conn.beginTransaction()

      // Find expired contact requests that are still pending
      const [expiredRequests] = await conn.query(`
        SELECT cr.*, tr.name as job_title
        FROM contact_requests cr
        JOIN tutor_requests tr ON cr.job_id = tr.id
        WHERE cr.status = 'pending' AND cr.expires_at < NOW()
      `)

      let processedCount = 0
      const results = []

      for (const request of expiredRequests) {
        const refundAmount = Math.floor(request.coins_spent * 0.9) // 90% refund
        const processingFee = request.coins_spent - refundAmount // 10% processing fee

        // Update contact request status
        await conn.query(`
          UPDATE contact_requests 
          SET status = 'expired', refund_status = 'partial', refund_amount = ?
          WHERE id = ?
        `, [refundAmount, request.id])

        // Add refund to requester's wallet
        await conn.query(`
          UPDATE user_wallets 
          SET coin_balance = coin_balance + ?
          WHERE user_id = ?
        `, [refundAmount, request.requester_id])

        // Record refund transaction
        await conn.query(`
          INSERT INTO coin_transactions (user_id, transaction_type, coins_amount, description, status)
          VALUES (?, 'refund', ?, ?, 'completed')
        `, [
          request.requester_id,
          refundAmount,
          `Auto-refund for expired contact request: ${request.job_title} (90% of ${request.coins_spent} coins)`
        ])

        // Create notification for requester
        await conn.query(`
          INSERT INTO notifications (user_id, type, title, message, link, is_read)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          request.requester_id,
          'contact_expired',
          'Contact Request Expired',
          `Your contact request for "${request.job_title}" has expired (30 days). ${refundAmount} coins have been refunded to your wallet (10% processing fee applied).`,
          `/wallet`,
          0
        ])

        processedCount++
        results.push({
          id: request.id,
          jobTitle: request.job_title,
          refundAmount,
          processingFee
        })
      }

      await conn.commit()
      
      return NextResponse.json({ 
        success: true, 
        message: `Processed ${processedCount} expired contact requests`,
        processedCount,
        results
      })

    } catch (e) {
      await conn.rollback()
      console.error('Error processing expired requests:', e)
      return NextResponse.json({ error: 'Failed to process expired requests' }, { status: 500 })
    } finally {
      conn.release()
    }
  } catch (e) {
    console.error('Error in expire contact requests API:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
