import mongoose from 'mongoose'
import {
  requestMetaFromHeaders,
  saveContactRequest,
} from '../src/controllers/support.controller.js'

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
      ok: false,
      error: 'METHOD_NOT_ALLOWED',
      message: 'Method not allowed.',
    })
    return
  }

  try {
    const result = await saveContactRequest(
      await getBody(req),
      requestMetaFromHeaders(req.headers),
      { beforeSave: connectDb },
    )

    res.status(result.statusCode).json(result.body)
  } catch (error) {
    console.error('Contact API error:', error?.message || error)

    res.status(500).json({
      ok: false,
      error: 'SERVER_ERROR',
      message: 'Could not save your request right now. Please try again.',
    })
  }
}
