import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;
    
    // Get filters from query params
    const tutoring_type = searchParams.get('tutoring_type');
    const status = searchParams.get('status');

    // Build WHERE clause based on filters
    let whereClause = 'WHERE 1=1';
    const params = [];

    if (tutoring_type) {
      whereClause += ' AND tutoring_type = ?';
      params.push(tutoring_type);
    }

    if (status) {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    // Get total count for pagination
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM tutor_requests ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Get paginated results
    const [requests] = await pool.query(
      `SELECT * FROM tutor_requests ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      requests,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching tutor requests:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 