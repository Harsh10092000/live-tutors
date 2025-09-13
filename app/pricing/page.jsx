'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const PricingPage = () => {
	const [rates, setRates] = useState({ USD: 1, INR: 83.0 })
	const [currency, setCurrency] = useState('USD')

	useEffect(() => {
		let mounted = true
		fetch('/api/exchange-rates')
			.then((r) => r.json())
			.then((data) => { if (!mounted) return; if (data?.rates) setRates((r) => ({ ...r, ...data.rates })) })
			.catch(() => {})
		return () => { mounted = false }
	}, [])

	const baseUsdPerCoin = 1 / 100
	const packageDefs = [
		{ coins: 100, discountPct: 0 },
		{ coins: 500, discountPct: 2 },
		{ coins: 1000, discountPct: 4 },
		{ coins: 2500, discountPct: 6 },
		{ coins: 5000, discountPct: 8 },
		{ coins: 10000, discountPct: 10 },
	]
	const packages = packageDefs.map((p) => {
		const base = p.coins * baseUsdPerCoin
		const discountAmount = (base * p.discountPct) / 100
		const finalPrice = +(base - discountAmount).toFixed(2)
		return { ...p, base, discountAmount, finalPrice, popular: p.coins === 500 || p.coins === 5000 }
	})

	const format = (usd) => currency === 'USD' ? `USD ${usd.toFixed(2)}` : `INR ${(usd * (rates.INR || 83)).toFixed(2)}`
	const effectivePer100 = (usd) => currency === 'USD' ? `USD ${(usd).toFixed(2)} per 1000 coins` : `INR ${((usd * (rates.INR || 83))).toFixed(2)} per 1000 coins`

	return (
		<div className="tu-main-section">
			<div className="container">
				<div className="pricing-hero">
					<h1>Pricing</h1>
					<p>Choose the coin package that suits you. 100 coins = USD 1. Bigger packs include automatic discounts.</p>
					<div className="pricing-currency">
						<span className={`pricing-chip ${currency === 'USD' ? 'active' : ''}`} onClick={() => setCurrency('USD')}>USD</span>
						<span className={`pricing-chip ${currency === 'INR' ? 'active' : ''}`} onClick={() => setCurrency('INR')}>INR</span>
					</div>
				</div>

				<div className="pricing-benefits">
					<div className="benefit-card">
						<div className="iconwrap"><i className="icon icon-zap"></i></div>
						<div><h6>Instant delivery</h6><p>Coins are credited to your wallet immediately after payment.</p></div>
					</div>
					<div className="benefit-card">
						<div className="iconwrap"><i className="icon icon-shield"></i></div>
						<div><h6>Secure payments</h6><p>Trusted payment gateway with industry‑standard security.</p></div>
					</div>
					<div className="benefit-card">
						<div className="iconwrap"><i className="icon icon-gift"></i></div>
						<div><h6>Coupons & bonuses</h6><p>Apply promo codes and get extra coins on select packs.</p></div>
					</div>
					<div className="benefit-card">
						<div className="iconwrap"><i className="icon icon-help-circle"></i></div>
						<div><h6>24/7 support</h6><p>We are here to help you with billing and wallet queries.</p></div>
					</div>
				</div>

				<div className="pricing-divider" />

				<div className="pricing-grid">
					{packages.map((pkg) => (
						<div key={pkg.coins} className="pricing-card">
						
							{pkg.discountPct > 0 && <span className="save-chip">Save {pkg.discountPct}%</span>}
							<div className="card-head">
								<h5><i className="icon icon-coins"></i> {pkg.coins.toLocaleString()} coins</h5>
							</div>
							<div className="card-body">
								<div className="price-row">
									<span className="now">{format(pkg.finalPrice)}</span>
									{pkg.discountPct > 0 && <span className="old">USD {pkg.base.toFixed(2)}</span>}
								</div>
								<div className="per-hundred">{currency === 'USD' ? `USD ${(pkg.finalPrice).toFixed(2)} per 1000 coins` : `INR ${((pkg.finalPrice * (rates.INR || 83))).toFixed(2)} per 1000 coins`}</div>
								<div className="features">
									<span><i className="icon icon-zap"></i> Instant credit</span>
									<span><i className="icon icon-shield"></i> Secure checkout</span>
									<span><i className="icon icon-star"></i> Best value</span>
								</div>
							</div>
							<div className="cta">
								<Link href="/wallet" className="tu-primbtn btn-wide">
									<span>Buy on Wallet</span>
									<i className="icon icon-arrow-right"></i>
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className="pricing-faq">
					<h3>Frequently asked questions</h3>
					<div className="faq-item"><div className="q"><i className="icon icon-help-circle"></i> Can I change currency?</div><div className="a">Yes, toggle USD/INR at the top to see live prices based on the current exchange rate.</div></div>
					<div className="faq-item"><div className="q"><i className="icon icon-shield"></i> Is payment secure?</div><div className="a">Yes, we use a secure, industry‑standard payment gateway and never store card data.</div></div>
				</div>
			</div>
		</div>
	)
}

export default PricingPage
