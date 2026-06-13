import { Router } from 'express'
import {
  createContactRequest,
  createExportDataRequest,
} from '../controllers/support.controller.js'

const router = Router()

router.post('/contact', createContactRequest)
router.post('/export-data', createExportDataRequest)

export default router
