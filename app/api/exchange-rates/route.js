import { NextResponse } from 'next/server'

const SUPPORTED_CURRENCIES = ['USD', 'INR']
let cache = { ts: 0, data: null }
const TTL_MS = 10 * 60 * 1000 // 10 minutes

async function fetchFromFrankfurterDev() {
	// https://api.frankfurter.dev/v1/latest?base=USD (no API key)
	const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD', { cache: 'no-store' })
	if (!res.ok) throw new Error('frankfurter.dev: http error')
	const json = await res.json()
	if (!json?.rates) throw new Error('frankfurter.dev: bad payload')
	return { base: 'USD', rates: json.rates, source: 'frankfurter.dev' }
}

async function fetchFromERAPI() {
	// https://open.er-api.com/v6/latest/USD (no API key)
	const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' })
	if (!res.ok) throw new Error('erapi: http error')
	const json = await res.json()
	if (!json?.rates) throw new Error('erapi: bad payload')
	return { base: 'USD', rates: json.rates, source: 'open.er-api.com' }
}

async function fetchFromExchangeRateHost() {
	// https://api.exchangerate.host/latest?base=USD (no API key)
	const res = await fetch('https://api.exchangerate.host/latest?base=USD', { cache: 'no-store' })
	if (!res.ok) throw new Error('exchangerate.host: http error')
	const json = await res.json()
	if (!json?.rates) throw new Error('exchangerate.host: bad payload')
	return { base: 'USD', rates: json.rates, source: 'exchangerate.host' }
}

function normalizeRates(rates) {
	const out = {}
	for (const cur of SUPPORTED_CURRENCIES) {
		out[cur] = cur === 'USD' ? 1 : Number(rates[cur]) || undefined
	}
	return out
}

export async function GET() {
	// Serve from in-memory cache
	if (cache.data && Date.now() - cache.ts < TTL_MS) {
		return NextResponse.json(cache.data, {
			headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=300' },
		})
	}

	const providers = [fetchFromFrankfurterDev, fetchFromERAPI, fetchFromExchangeRateHost]
	for (const provider of providers) {
		try {
			const { base, rates, source } = await provider()
			const filtered = normalizeRates(rates)
			// Ensure all supported currencies exist; if any missing, continue to next provider
			if (Object.values(filtered).some((v) => typeof v === 'undefined')) throw new Error('missing currency')
			const payload = { base, rates: filtered, updatedAt: new Date().toISOString(), source }
			cache = { ts: Date.now(), data: payload }
			return NextResponse.json(payload, {
				headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=300' },
			})
		} catch (e) {
			// try next provider
		}
	}

	// Final fallback
	const fallback = {
		base: 'USD',
		rates: { USD: 1, INR: 83.0 },
		updatedAt: new Date().toISOString(),
		source: 'fallback',
	}
	cache = { ts: Date.now(), data: fallback }
	return NextResponse.json(fallback)
}
