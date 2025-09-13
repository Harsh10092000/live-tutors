'use client'
import { useEffect, useState } from 'react'

const EnvironmentChecker = () => {
  const [envStatus, setEnvStatus] = useState({
    razorpayKey: false,
    razorpayScript: false,
    database: false
  })

  useEffect(() => {
    // Check Razorpay key
    const razorpayKey = !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    setEnvStatus(prev => ({ ...prev, razorpayKey }))

    // Check Razorpay script
    const checkRazorpayScript = () => {
      const scriptLoaded = typeof window.Razorpay !== 'undefined'
      setEnvStatus(prev => ({ ...prev, razorpayScript: scriptLoaded }))
    }

    // Check immediately and after a delay
    checkRazorpayScript()
    const timer = setTimeout(checkRazorpayScript, 2000)

    // Check database connection
    fetch('/api/wallet/summary')
      .then(res => res.json())
      .then(data => {
        setEnvStatus(prev => ({ ...prev, database: !data.error }))
      })
      .catch(() => {
        setEnvStatus(prev => ({ ...prev, database: false }))
      })

    return () => clearTimeout(timer)
  }, [])

  // Only show in development or if there are issues
  if (process.env.NODE_ENV === 'production' && Object.values(envStatus).every(Boolean)) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div>Environment Status:</div>
      <div>Razorpay Key: {envStatus.razorpayKey ? '✅' : '❌'}</div>
      <div>Razorpay Script: {envStatus.razorpayScript ? '✅' : '❌'}</div>
      <div>Database: {envStatus.database ? '✅' : '❌'}</div>
    </div>
  )
}

export default EnvironmentChecker
