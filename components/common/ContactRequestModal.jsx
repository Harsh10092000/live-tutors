'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ContactRequestModal = ({ open, onClose, jobUrl, jobTitle, jobId }) => {
  const [loading, setLoading] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    setError('')
    setLoading(true)
    fetch('/api/wallet/summary', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setWallet(data))
      .catch(() => setError('Unable to fetch wallet summary. Please try again.'))
      .finally(() => setLoading(false))
  }, [open])

  const handleAddCoins = () => {
    onClose?.()
    router.push('/wallet')
  }

  const handleProceed = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/wallet/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: 50, 
          reason: `Contact request for job: ${jobTitle || 'Unknown'}`, 
          jobId: jobId,
          meta: { jobUrl, jobTitle } 
        })
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || 'Insufficient balance or server error.')
        return
      }
      onClose?.()
      alert('Contact request sent successfully! You will be notified when the job poster responds. Request expires in 30 days.')
    } catch (e) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const hasEnough = (wallet?.balance || 0) >= 50

  return (
    <div className="contact-modal-backdrop">
      <div className="contact-modal">
        <div className="contact-modal-header">
          <div className="contact-modal-title">
            <i className="icon icon-mail"></i>
            <div>
              <h5>Send contact request</h5>
              <p className="contact-subtitle">Connect with the job poster to discuss details and next steps</p>
            </div>
          </div>
          <button className="contact-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="contact-modal-body">
          {loading && (
            <div className="contact-loading">
              <div className="contact-spinner"></div>
              <p>Loading wallet balance...</p>
            </div>
          )}
          {!loading && (
            <>
              <div className="contact-intro-card">
                <p className="contact-intro">
                  We’ll submit your request{jobTitle ? ` for “${jobTitle}”` : ''} to the job poster. If they approve, the verified contact details will be unlocked for you and we’ll notify you instantly.
                </p>
                <div className="contact-stats">
                  <span className="contact-chip contact-cost"><i className="icon icon-coins"></i> 50 coins</span>
                  <span className="contact-chip"><i className="icon icon-clock"></i> Decision within 30 days</span>
                  <span className="contact-chip"><i className="icon icon-shield"></i> 90% refund on reject/timeout</span>
                </div>
              </div>

              <div className="contact-policy">
                <ul>
                  <li><strong>What happens next:</strong> Your request is sent to the job poster. If approved, you receive an email and your dashboard will display the contact number.</li>
                  <li><strong>If rejected:</strong> 90% of the coins are refunded. A 10% processing fee applies.</li>
                  <li><strong>If no action in 30 days:</strong> Automatic 90% refund; 10% processing fee applies.</li>
                  <li className="contact-risk"><strong>Important:</strong> Proceed at your own discretion. LiveTutors only facilitates the connection and is not responsible for subsequent engagement outcomes.</li>
                </ul>
              </div>

              <div className="contact-balance">
                <span>Current balance:</span>
                <strong className="contact-balance-amount">{Number(wallet?.balance || 0).toLocaleString()} coins</strong>
                {!hasEnough && <em className="not-enough">Not enough coins</em>}
              </div>
              {error && <div className="contact-error">{error}</div>}
            </>
          )}
        </div>
        <div className="contact-modal-footer">
          {hasEnough ? (
            <button className="tu-primbtn" onClick={handleProceed} disabled={loading}>
              <span>{loading ? 'Processing...' : 'Proceed (50 coins)'}</span>
            </button>
          ) : (
            <button className="tu-primbtn" onClick={handleAddCoins}>
              <span>Add coins</span>
              <i className="icon icon-coins"></i>
            </button>
          )}
          <button className="tu-secbtn" onClick={onClose} disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ContactRequestModal


