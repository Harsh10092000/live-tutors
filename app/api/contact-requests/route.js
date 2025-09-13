import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// GET - Fetch contact requests for a user (job poster)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = session.user.id
    const status = searchParams.get('status') || 'all'

    let query = `
      SELECT 
        cr.*,
        tr.name as job_title,
        tr.url as job_url,
        u.name as requester_name,
        u.email as requester_email
      FROM contact_requests cr
      JOIN tutor_requests tr ON cr.job_id = tr.id
      JOIN users u ON cr.requester_id = u.id
      WHERE cr.job_poster_id = ?
    `
    
    const params = [userId]
    
    if (status !== 'all') {
      query += ' AND cr.status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY cr.created_at DESC'

    const [rows] = await db.query(query, params)
    
    return NextResponse.json({ contactRequests: rows })
  } catch (e) {
    console.error('Error fetching contact requests:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new contact request (handled by wallet/spend API)
export async function POST(request) {
  return NextResponse.json({ error: 'Use /api/wallet/spend for creating contact requests' }, { status: 405 })
}
