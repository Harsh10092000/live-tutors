'use client'
import React from 'react'
import Link from 'next/link'

const LoginRequiredModal = ({ open, onClose }) => {
	if (!open) return null
	return (
		<div className="lr-overlay" role="dialog" aria-modal="true">
			<div className="lr-modal">
				<div className="lr-header">
					<h5 className="lr-title"><i className="icon icon-lock"></i> Login required</h5>
					<button aria-label="Close" className="lr-close" onClick={onClose}><i className="icon icon-x"></i></button>
				</div>
				<div className="lr-body">
					<p>To continue with payment, please log in to your account.</p>
				</div>
				<div className="lr-actions">
					<Link href="/login" className="tu-primbtn">
						<span>Go to Login</span>
						<i className="icon icon-log-in"></i>
					</Link>
					<button className="tu-secbtn" onClick={onClose}>
						<span>Cancel</span>
						<i className="icon icon-x"></i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoginRequiredModal
