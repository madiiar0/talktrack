import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDb } from './config/db.js'
import {
  errorHandler,
  notFoundHandler,
} from './middleware/errorHandler.js'
import waitlistRoutes from './routes/waitlist.routes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001

function normalizeOrigin(origin) {
  return typeof origin === 'string' ? origin.replace(/\/+$/, '') : ''
}

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    'https://talktrack.life',
    'https://www.talktrack.life',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]
    .map(normalizeOrigin)
    .filter(Boolean),
)

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
}

app.use(
  cors(corsOptions),
)
app.options('*', cors(corsOptions))
app.use(express.json({ limit: '16kb' }))

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'TalkTrack API is running.',
  })
})

app.use('/api/waitlist', waitlistRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

connectDb()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`TalkTrack API listening on port ${port}`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `Port ${port} is already in use. Stop the process using that port or set a different PORT in backend/.env.`,
        )
        process.exit(1)
      }

      console.error('Failed to start server:', error.message)
      process.exit(1)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  })
