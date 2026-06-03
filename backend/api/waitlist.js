import mongoose from 'mongoose'
import WaitlistEntry from '../src/models/WaitlistEntry.js'

const MAX_LENGTHS = {
  name: 120,
  contact: 160,
  honestPrice: 80,
  suggestions: 2000,
}

function normalizeOrigin(origin) {
  return typeof origin === 'string' ? origin.replace(/\/+$/, '') : ''
}

function getAllowedOrigins() {
  return new Set(
    [
      process.env.FRONTEND_URL,
      'https://talktrack.life',
      'https://www.talktrack.life',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ]
      .map(normalizeOrigin)
      .filter(Boolean),
  )
}

function setCorsHeaders(req, res) {
  const requestOrigin = normalizeOrigin(req.headers.origin)
  const allowedOrigins = getAllowedOrigins()

  if (requestOrigin && allowedOrigins.has(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

function trimValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidContact(contact) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[+\d() -]{7,25}$/
  const digitCount = (contact.match(/\d/g) || []).length

  return emailPattern.test(contact) || (phonePattern.test(contact) && digitCount >= 7)
}

async function readRequestText(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf8')
}

async function getBody(req) {
  if (!req.body) {
    const text = await readRequestText(req)

    if (!text) return {}

    try {
      return JSON.parse(text)
    } catch {
      return {}
    }
  }

  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString('utf8'))
    } catch {
      return {}
    }
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return req.body
}

function validateWaitlistPayload(body) {
  const payload = {
    name: trimValue(body.name),
    contact: trimValue(body.contact).toLowerCase(),
    honestPrice: trimValue(body.honestPrice),
    suggestions: trimValue(body.suggestions),
  }

  if (!payload.name) return { error: 'Name is required.' }
  if (!payload.contact) return { error: 'Email or phone number is required.' }
  if (!payload.honestPrice) return { error: 'Payment preference is required.' }

  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    if (payload[field].length > maxLength) {
      return { error: `${field} is too long.` }
    }
  }

  if (!isValidContact(payload.contact)) {
    return { error: 'Enter a valid email or phone number.' }
  }

  return { payload }
}

async function connectDb() {
  if (mongoose.connection.readyState === 1) return

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required')
  }

  await mongoose.connect(process.env.MONGODB_URI)
}

export default async function handler(req, res) {
  setCorsHeaders(req, res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST,OPTIONS')
    res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    })
    return
  }

  try {
    const { payload, error } = validateWaitlistPayload(await getBody(req))

    if (error) {
      res.status(400).json({
        success: false,
        message: error,
      })
      return
    }

    await connectDb()

    try {
      await WaitlistEntry.create(payload)
    } catch (entryError) {
      if (entryError?.code === 11000) {
        res.status(200).json({
          success: true,
          message: 'You are already on the waitlist.',
        })
        return
      }

      throw entryError
    }

    res.status(201).json({
      success: true,
      message: 'You are on the waitlist.',
    })
  } catch (error) {
    console.error('Waitlist API error:', error?.message || error)

    res.status(500).json({
      success: false,
      message: 'Could not save your request right now. Please try again.',
    })
  }
}
