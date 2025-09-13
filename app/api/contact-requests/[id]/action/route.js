import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// POST - Approve or reject a contact request
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const { action } = await request.json() // 'approve' or 'reject'
    const userId = session.user.id

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const conn = await db.getConnection()
    try {
      await conn.beginTransaction()

      // Get contact request details
      const [contactRows] = await conn.query(`
        SELECT cr.*, tr.name as job_title, u.name as requester_name, u.email as requester_email
        FROM contact_requests cr
        JOIN tutor_requests tr ON cr.job_id = tr.id
        JOIN users u ON cr.requester_id = u.id
        WHERE cr.id = ? AND cr.job_poster_id = ? AND cr.status = 'pending'
      `, [id, userId])

      if (!contactRows.length) {
        await conn.rollback()
        return NextResponse.json({ error: 'Contact request not found or already processed' }, { status: 404 })
      }

      const contactRequest = contactRows[0]
      const now = new Date()

      if (action === 'approve') {
        // Approve the request
        await conn.query(`
          UPDATE contact_requests 
          SET status = 'approved', approved_at = ?
          WHERE id = ?
        `, [now, id])

        // Create notification for requester
        await conn.query(`
          INSERT INTO notifications (user_id, type, title, message, link, is_read)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          contactRequest.requester_id,
          'contact_approved',
          'Contact Request Approved',
          `Your contact request for "${contactRequest.job_title}" has been approved! You can now view the contact details.`,
          `/tutor-jobs/${contactRequest.job_id}`,
          0
        ])

        await conn.commit()
        return NextResponse.json({ 
          success: true, 
          message: 'Contact request approved successfully',
          status: 'approved'
        })

      } else if (action === 'reject') {
        // Reject the request and process refund
        const refundAmount = Math.floor(contactRequest.coins_spent * 0.9) // 90% refund
        const processingFee = contactRequest.coins_spent - refundAmount // 10% processing fee

        // Update contact request
        await conn.query(`
          UPDATE contact_requests 
          SET status = 'rejected', rejected_at = ?, refund_status = 'partial', refund_amount = ?
          WHERE id = ?
        `, [now, refundAmount, id])

        // Add refund to requester's wallet
        await conn.query(`
          UPDATE user_wallets 
          SET coin_balance = coin_balance + ?
          WHERE user_id = ?
        `, [refundAmount, contactRequest.requester_id])

        // Record refund transaction
        await conn.query(`
          INSERT INTO coin_transactions (user_id, transaction_type, coins_amount, description, status)
          VALUES (?, 'refund', ?, ?, 'completed')
        `, [
          contactRequest.requester_id,
          refundAmount,
          `Refund for rejected contact request: ${contactRequest.job_title} (90% of ${contactRequest.coins_spent} coins)`
        ])

        // Create notification for requester
        await conn.query(`
          INSERT INTO notifications (user_id, type, title, message, link, is_read)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          contactRequest.requester_id,
          'contact_rejected',
          'Contact Request Rejected',
          `Your contact request for "${contactRequest.job_title}" was rejected. ${refundAmount} coins have been refunded to your wallet (10% processing fee applied).`,
          `/wallet`,
          0
        ])

        await conn.commit()
        return NextResponse.json({ 
          success: true, 
          message: 'Contact request rejected and refund processed',
          status: 'rejected',
          refundAmount,
          processingFee
        })
      }

    } catch (e) {
      await conn.rollback()
      console.error('Error processing contact request action:', e)
      return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
    } finally {
      conn.release()
    }
  } catch (e) {
    console.error('Error in contact request action API:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
