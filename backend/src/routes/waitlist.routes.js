import { Router } from 'express'
import {
  createWaitlistEntry,
  getWaitlistCount,
} from '../controllers/waitlist.controller.js'

const router = Router()

router.post('/', createWaitlistEntry)
router.get('/count', getWaitlistCount)

export default router
