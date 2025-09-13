'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LoginRequiredModal from '@/components/common/LoginRequiredModal'
import { useSession } from 'next-auth/react'

const WalletPage = () => {
  // Default to purchase tab as requested
  const [activeTab, setActiveTab] = useState('purchase')
  const [selectedAmount, setSelectedAmount] = useState(500)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [couponCode, setCouponCode] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const [walletData, setWalletData] = useState({ balance: 0, totalPurchased: 0, totalSpent: 0 })
  const [transactions, setTransactions] = useState([])
  const [rates, setRates] = useState({ USD: 1, INR: 83.0 })

  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  // Remove temp flag; keep modal state
  const [showLoginModal, setShowLoginModal] = useState(false)

  // If not logged in and somehow on history tab, bounce back to purchase
  useEffect(() => {
    if (!isLoggedIn && activeTab === 'history') setActiveTab('purchase')
  }, [isLoggedIn, activeTab])

  useEffect(() => {
    let isMounted = true
    
    Promise.all([
      fetch('/api/exchange-rates').then(r => r.json()).catch(() => null),
      isLoggedIn ? fetch('/api/wallet/summary', { cache: 'no-store' }).then(r => r.json()).catch(() => null) : Promise.resolve(null),
      isLoggedIn ? fetch('/api/wallet/transactions', { cache: 'no-store' }).then(r => r.json()).catch(() => null) : Promise.resolve(null)
    ]).then(([rateData, summary, tx]) => {
      if (!isMounted) return
      if (rateData?.rates) setRates(rateData.rates)
      if (summary && !summary.error) setWalletData(summary)
      if (tx?.transactions) setTransactions(tx.transactions)
    })
    return () => { isMounted = false }
  }, [isLoggedIn, session])

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => {
      console.log('Razorpay script loaded successfully')
    }
    script.onerror = () => {
      console.error('Failed to load Razorpay script')
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // 100 coins = $1; progressive discount after first package
  const baseUsdPerCoin = 1 / 100
  const [packages, setPackages] = useState([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/coin-packages', { cache: 'no-store' })
        const data = await res.json()
        const rows = Array.isArray(data?.packages) ? data.packages : []
        const computed = rows.map((p) => {
          const base = Number(p.usdPrice)
          const discountAmount = (base * Number(p.discountPct || 0)) / 100
          const finalPrice = +(base - discountAmount).toFixed(2)
          return {
            coins: Number(p.coins),
            discountPct: Number(p.discountPct || 0),
            base,
            discountAmount,
            finalPrice,
            popular: !!p.isPopular
          }
        })

        // Fallback if no packages returned
        const fallbackDefs = [
          { coins: 100, discountPct: 0 },
          { coins: 500, discountPct: 2 },
          { coins: 1000, discountPct: 4 },
          { coins: 2500, discountPct: 6 },
          { coins: 5000, discountPct: 8 },
        ]
        const fallback = fallbackDefs.map((p) => {
          const base = p.coins * baseUsdPerCoin
          const discountAmount = (base * p.discountPct) / 100
          const finalPrice = +(base - discountAmount).toFixed(2)
          return { ...p, base, discountAmount, finalPrice, popular: p.coins === 500 || p.coins === 5000 }
        })

        if (mounted) setPackages(computed.length ? computed : fallback)
      } catch {
        const fallbackDefs = [
          { coins: 100, discountPct: 0 },
          { coins: 500, discountPct: 2 },
          { coins: 1000, discountPct: 4 },
          { coins: 2500, discountPct: 6 },
          { coins: 5000, discountPct: 8 },
        ]
        const fallback = fallbackDefs.map((p) => {
          const base = p.coins * baseUsdPerCoin
          const discountAmount = (base * p.discountPct) / 100
          const finalPrice = +(base - discountAmount).toFixed(2)
          return { ...p, base, discountAmount, finalPrice, popular: p.coins === 500 || p.coins === 5000 }
        })
        if (mounted) setPackages(fallback)
      }
    })()
    return () => { mounted = false }
  }, [baseUsdPerCoin])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    } catch (e) {
      return 'Invalid Date'
    }
  }
  const convertToSelectedCurrency = (usd) => (usd * (rates[selectedCurrency] || 1)).toFixed(2)

  const Status = ({ status }) => (
    <span className={`wallet-status ${status === 'completed' ? 'success' : status === 'pending' ? 'pending' : 'failed'}`}>
      <i className={`icon ${status === 'completed' ? 'icon-check' : status === 'pending' ? 'icon-clock' : 'icon-x-circle'}`}></i>
      {status}
    </span>
  )

  const TxnIcon = ({ type }) => (
    <div className="iconwrap">
      <i className={`icon ${type === 'purchase' ? 'icon-arrow-up' : type === 'spend' ? 'icon-arrow-down' : 'icon-gift'}`}></i>
    </div>
  )

  const selectedPkg = packages.find((p) => p.coins === selectedAmount) || packages[0] || { coins: selectedAmount, base: 0, discountAmount: 0, finalPrice: 0, discountPct: 0, popular: false }
  const formatMoney = (usd) => `${selectedCurrency} ${convertToSelectedCurrency(usd)}`

  // Handle payment processing
  const handlePayment = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    setIsProcessingPayment(true)
    let totalAmt = convertToSelectedCurrency(selectedPkg.finalPrice) * (selectedCurrency === 'INR' ? 100 : 100);
    let totalAmtInMain = convertToSelectedCurrency(selectedPkg.finalPrice) ;

    console.log("totalAmt : " , totalAmt , totalAmtInMain)
    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmtInMain,
          currency: selectedCurrency,
          coins: selectedAmount,
          userId: session?.user?.id
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.orderId) {
        throw new Error('Failed to create payment order')
      }

      
      
      // Check if Razorpay is available
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay is not loaded. Please refresh the page and try again.')
      }

      // Check if Razorpay key is available
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      if (!razorpayKey) {
        throw new Error('Payment configuration is missing. Please contact support.')
      }

      // Initialize Razorpay payment
      const options = {
        key: razorpayKey,
        amount: Math.round(totalAmt),
        currency: selectedCurrency,
        name: 'Live Tutors',
        description: `${selectedAmount} Coins Purchase`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                coins: selectedAmount,
                userId: session?.user?.id,
                amount: totalAmt,
                currency: selectedCurrency
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              // Payment successful - refresh wallet summary and transactions
              try {
                const [s, t] = await Promise.all([
                  fetch('/api/wallet/summary', { cache: 'no-store' }).then(r => r.json()),
                  fetch('/api/wallet/transactions', { cache: 'no-store' }).then(r => r.json())
                ])
                if (s && !s.error) setWalletData(s)
                if (Array.isArray(t?.transactions)) setTransactions(t.transactions)
              } catch {}
              alert(`Payment successful! ${selectedAmount} coins added to your wallet.`)
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
        },
        theme: {
          color: '#6A307D'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to process payment. Please try again.')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <div className="tu-main-section pt-0 ">
      <div className="wallet-wrapper">
      <div className="container">
       <div className="wallet-hero">
          <div className="row align-items-center g-0 gy-4 pt-5">
            <div className="col-lg-8">
              <h1>
                Your <span className="tu-green">Digital Wallet</span>
              </h1>
              <p>Manage your coins, purchase packages, and track your transactions with our secure wallet system.</p>
              <div className="wallet-cta white mt-2">
                <span>{walletData.balance.toLocaleString()} coins</span>
                <i className="icon icon-coins"></i>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              <Image src="/images/index/banner/img-07.png" alt="Wallet" width={420} height={320} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="container">
        {/* Hero */}
       

        {/* Highlighted Actions */}
        <div className="wallet-actions">
          <div className="wallet-action tu-primbtn-gradient">
            <div>
              <div className="title">Buy Coins</div>
              <div className="sub">Instant delivery, secure payment</div>
            </div>
            <button className="cta" onClick={() => setActiveTab('purchase')}>Buy now</button>
          </div>
          <div className="wallet-action teal">
            <div>
              <div className="title">Redeem Coupon</div>
              <div className="sub">Apply coupon to add free coins</div>
            </div>
            <button className="cta" onClick={() => setActiveTab('coupons')}>Redeem</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="wallet-card">
          <div className="wallet-tabs">
            <button className={`wallet-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <i className="icon icon-wallet"></i> Overview
            </button>
            <button className={`wallet-tab ${activeTab === 'purchase' ? 'active' : ''}`} onClick={() => setActiveTab('purchase')}>
              <i className="icon icon-credit-card"></i> Purchase Coins
            </button>
            {isLoggedIn && (
              <button className={`wallet-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                <i className="icon icon-history"></i> Transaction History
              </button>
            )}
            <button className={`wallet-tab ${activeTab === 'coupons' ? 'active' : ''}`} onClick={() => setActiveTab('coupons')}>
              <i className="icon icon-gift"></i> Redeem Coupon
            </button>
          </div>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="row mt-3">
              <div className="col-lg-8">
                {isLoggedIn ? (
                  <div className="wallet-card">
                    <h4 style={{ marginBottom: 10 }}>Recent Activity</h4>
                    <div className="d-flex flex-column gap-2">
                      {transactions.slice(0, 3).map((t) => (
                        <div className="wallet-transaction" key={t.id}>
                          <div className="left">
                            <TxnIcon type={t.type} />
                            <div>
                              <div className="title">{t.description}</div>
                              <div className="meta">{formatDate(t.date)}</div>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className={`wallet-amount ${(t.amount || 0) > 0 ? 'positive' : 'negative'}`}>{(t.amount || 0) > 0 ? '+' : ''}{Number(t.amount || 0).toLocaleString()} coins</div>
                            {t.usdAmount && t.usdAmount > 0 && <div className="meta">${Number(t.usdAmount).toFixed(2)} {t.currency || 'USD'}</div>}
                          </div>
                          <Status status={t.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="wallet-card">
                    <h4 style={{ marginBottom: 10 }}>Welcome to your wallet</h4>
                    <p style={{ color: '#64748b', fontWeight: 700 }}>Login to view your recent activity and full history.</p>
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <div className="wallet-card">
                  <h4 style={{ marginBottom: 12 }}>Quick Actions</h4>
                  <div className="d-grid gap-2">
                    <button className="wallet-btn-primary" onClick={() => setActiveTab('purchase')}>
                      <i className="icon icon-arrow-right"></i>
                      Buy Coins
                    </button>
                    <button className="tu-secbtn" onClick={() => setActiveTab('coupons')}>
                      <span>Redeem Coupon</span>
                      <i className="icon icon-gift"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase */}
          {activeTab === 'purchase' && (
            <div className="mt-3">
              <div className="wallet-section-head">
                <i className="icon icon-coins"></i>
                <h3>Choose a Package</h3>
              </div>
              <div className="wallet-packages" style={{ marginTop: 12 }}>
                {packages.map((pkg) => (
                  <div
                    key={pkg.coins}
                    className={`wallet-plan ${pkg.popular ? 'popular' : ''} ${selectedAmount === pkg.coins ? 'selected' : ''}`}
                    onClick={() => setSelectedAmount(pkg.coins)}
                  >
                    {pkg.popular && <span className="badge">POPULAR</span>}
                    <div className="head">
                      <i className="icon icon-coins"></i>
                      <span>{pkg.coins.toLocaleString()} coins</span>
                    </div>
                    <div className="price">
                      <span className="now">
                        {selectedCurrency} {convertToSelectedCurrency(pkg.finalPrice)}
                        {console.log("pkg.finalPrice : " , pkg.finalPrice , selectedCurrency)}
                      </span>
                      {pkg.discountPct > 0 && <span className="old">{selectedCurrency} {convertToSelectedCurrency(pkg.base)}</span>}
                    </div>
                    {pkg.discountPct > 0 && <div className="save">Save {pkg.discountPct}%</div>}
                  </div>
                ))}
              </div>

              <div className="wallet-card mt-3">
                <h4 style={{ marginBottom: 10 }}>Select Currency</h4>
                <div className="wallet-chips">
                  {['USD','INR'].map((c) => (
                    <span key={c} className={`wallet-chip ${selectedCurrency === c ? 'active' : ''}`} onClick={() => setSelectedCurrency(c)}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="wallet-card mt-3">
                <h4 style={{ marginBottom: 10 }}>Order Summary</h4>
                <div className="order-summary">
                  <div className="os-row">
                    <div className="left">
                      <div className="iconwrap"><i className="icon icon-coins"></i></div>
                      <span className="label">Coins</span>
                    </div>
                    <span className="value">{selectedAmount.toLocaleString()} coins</span>
                  </div>

                  <div className="os-row">
                    <div className="left">
                      <div className="iconwrap"><i className="icon icon-credit-card"></i></div>
                      <span className="label">Base Price</span>
                    </div>
                    {selectedPkg.discountAmount > 0 ? (
                      <span className="value muted">{formatMoney(selectedPkg.base)}</span>
                    ) : (
                      <span className="value">{formatMoney(selectedPkg.base)}</span>
                    )}
                  </div>

                  {selectedPkg.discountAmount > 0 && (
                    <div className="os-row">
                      <div className="left">
                        <div className="iconwrap"><i className="icon icon-discount"></i></div>
                        <span className="label">Discount</span>
                        <span className="save-badge">Save {selectedPkg.discountPct}%</span>
                      </div>
                      <span className="value">- {formatMoney(selectedPkg.discountAmount)}</span>
                    </div>
                  )}

                  <div className="os-row">
                    <div className="left">
                      <div className="iconwrap"><i className="icon icon-globe"></i></div>
                      <span className="label">Exchange Rate</span>
                    </div>
                    <span className="rate">1 USD = {rates[selectedCurrency] || 1} {selectedCurrency}</span>
                  </div>

                  <hr />

                  <div className="os-totalbar">
                    <span className="title">Total</span>
                    <span className="amount">{formatMoney(selectedPkg.finalPrice)}</span>
                  </div>
                </div>
                <button className="wallet-btn-primary mt-3" onClick={handlePayment} disabled={isProcessingPayment}>
                  <i className="icon icon-credit-card"></i>
                  {isProcessingPayment ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          )}

          {/* History */}
          {isLoggedIn && activeTab === 'history' && (
            <div className="wallet-card mt-3">
              <h4 style={{ marginBottom: 10 }}>Transaction History</h4>
              {transactions.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {transactions.map((t) => (
                    <div className="wallet-transaction" key={t.id}>
                      <div className="left">
                        <TxnIcon type={t.type} />
                        <div>
                          <div className="title">{t.description}</div>
                          <div className="meta">{formatDate(t.date)}</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className={`wallet-amount ${(t.amount || 0) > 0 ? 'positive' : 'negative'}`}>{(t.amount || 0) > 0 ? '+' : ''}{Number(t.amount || 0).toLocaleString()} coins</div>
                        {t.usdAmount && t.usdAmount > 0 && <div className="meta">${Number(t.usdAmount).toFixed(2)} {t.currency || 'USD'}</div>}
                      </div>
                      <Status status={t.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="icon icon-history" style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }}></i>
                  <h5 style={{ color: '#64748b', marginBottom: '8px' }}>No transactions yet</h5>
                  <p style={{ color: '#94a3b8', marginBottom: '16px' }}>Your transaction history will appear here once you make your first purchase.</p>
                  <button className="tu-primbtn" onClick={() => setActiveTab('purchase')}>
                    <span>Buy Coins Now</span>
                    <i className="icon icon-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Coupons */}
          {activeTab === 'coupons' && (
            <div className="row mt-3">
              <div className="col-lg-6">
                <div className="wallet-card">
                  <h4 style={{ marginBottom: 10 }}>Enter Coupon Code</h4>
                  <div className="tu-inputbtn">
                    <input type="text" placeholder="Enter coupon code (e.g., WELCOME200)" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="form-control" />
                    <a href="javascript:void(0);" className="tu-primbtn">
                      <span>Redeem</span>
                      <i className="icon icon-gift"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wallet-card">
                  <h4 style={{ marginBottom: 10 }}>Available Coupons</h4>
                  <div className="d-grid gap-2">
                    <div className="wallet-transaction">
                      <div className="left">
                        <div className="iconwrap">
                          <i className="icon icon-coins"></i>
                        </div>
                        <div>
                          <div className="title">WELCOME200</div>
                          <div className="meta">Get 200 free coins on your first purchase</div>
                        </div>
                      </div>
                      <div className="wallet-amount positive">200 coins</div>
                    </div>
                    <div className="wallet-transaction">
                      <div className="left">
                        <div className="iconwrap">
                          <i className="icon icon-coins"></i>
                        </div>
                        <div>
                          <div className="title">BONUS500</div>
                          <div className="meta">Get 500 bonus coins on purchase above $10</div>
                        </div>
                      </div>
                      <div className="wallet-amount positive">500 coins</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LoginRequiredModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}

export default WalletPage