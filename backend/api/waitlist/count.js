import mongoose from 'mongoose'
import WaitlistEntry from '../../src/models/WaitlistEntry.js'

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

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
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

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET,OPTIONS')
    res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    })
    return
  }

  try {
    await connectDb()

    const count = await WaitlistEntry.countDocuments()

    res.status(200).json({
      success: true,
      count,
    })
  } catch {
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    })
  }
}
