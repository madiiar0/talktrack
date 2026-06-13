import ContactRequest from '../models/ContactRequest.js'
import ExportDataRequest from '../models/ExportDataRequest.js'

const MAX_LENGTHS = {
  name: 120,
  email: 160,
  appUserEmail: 160,
  accountEmail: 160,
  subject: 160,
  message: 4000,
  exportMessage: 2000,
  userAgent: 300,
}

function trimValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeEmail(value) {
  return trimValue(value).toLowerCase()
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function tooLong(value, maxLength) {
  return value.length > maxLength
}

function validationError(message) {
  return {
    statusCode: 400,
    body: {
      ok: false,
      error: 'VALIDATION_ERROR',
      message,
    },
  }
}

function success(message, statusCode = 201) {
  return {
    statusCode,
    body: {
      ok: true,
      message,
    },
  }
}

function isSpamTrapFilled(body) {
  return Boolean(trimValue(body.company) || trimValue(body.website))
}

export function requestMetaFromHeaders(headers = {}) {
  return {
    userAgent: trimValue(headers['user-agent']).slice(0, MAX_LENGTHS.userAgent),
  }
}

export async function saveContactRequest(body = {}, meta = {}, options = {}) {
  if (isSpamTrapFilled(body)) {
    return success('Your message has been received.', 200)
  }

  const payload = {
    type: 'contact',
    status: 'new',
    name: trimValue(body.name),
    email: normalizeEmail(body.email),
    appUserEmail: normalizeEmail(body.appUserEmail),
    subject: trimValue(body.subject),
    message: trimValue(body.message),
    userAgent: trimValue(meta.userAgent),
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return validationError('Please enter a valid email address.')
  }

  if (payload.appUserEmail && !isValidEmail(payload.appUserEmail)) {
    return validationError('Please enter a valid app user email address.')
  }

  if (!payload.subject) {
    return validationError('Please choose a subject or reason.')
  }

  if (payload.message.length < 10) {
    return validationError('Please enter a message with at least 10 characters.')
  }

  if (
    tooLong(payload.name, MAX_LENGTHS.name) ||
    tooLong(payload.email, MAX_LENGTHS.email) ||
    tooLong(payload.appUserEmail, MAX_LENGTHS.appUserEmail) ||
    tooLong(payload.subject, MAX_LENGTHS.subject) ||
    tooLong(payload.message, MAX_LENGTHS.message)
  ) {
    return validationError('One of the fields is too long.')
  }

  if (options.beforeSave) {
    await options.beforeSave()
  }

  await ContactRequest.create(payload)

  return success('Your message has been received.')
}

export async function saveExportDataRequest(body = {}, meta = {}, options = {}) {
  if (isSpamTrapFilled(body)) {
    return success('Your data export request has been received.', 200)
  }

  const accountEmail = normalizeEmail(body.accountEmail)
  const confirmAccountEmail = normalizeEmail(body.confirmAccountEmail)
  const payload = {
    type: 'export_data',
    status: 'new',
    name: trimValue(body.name),
    accountEmail,
    message: trimValue(body.message),
    ownershipVerificationAcknowledged:
      body.ownershipVerificationAcknowledged === true ||
      body.ownershipVerificationAcknowledged === 'true',
    userAgent: trimValue(meta.userAgent),
  }

  if (!accountEmail || !isValidEmail(accountEmail)) {
    return validationError('Please enter a valid account email address.')
  }

  if (accountEmail !== confirmAccountEmail) {
    return validationError('The account email fields must match.')
  }

  if (!payload.ownershipVerificationAcknowledged) {
    return validationError('Please confirm that TalkTrack may verify account ownership.')
  }

  if (
    tooLong(payload.name, MAX_LENGTHS.name) ||
    tooLong(payload.accountEmail, MAX_LENGTHS.accountEmail) ||
    tooLong(payload.message, MAX_LENGTHS.exportMessage)
  ) {
    return validationError('One of the fields is too long.')
  }

  if (options.beforeSave) {
    await options.beforeSave()
  }

  await ExportDataRequest.create(payload)

  return success('Your data export request has been received.')
}

export async function createContactRequest(req, res, next) {
  try {
    const result = await saveContactRequest(
      req.body || {},
      requestMetaFromHeaders(req.headers),
    )

    return res.status(result.statusCode).json(result.body)
  } catch (error) {
    return next(error)
  }
}

export async function createExportDataRequest(req, res, next) {
  try {
    const result = await saveExportDataRequest(
      req.body || {},
      requestMetaFromHeaders(req.headers),
    )

    return res.status(result.statusCode).json(result.body)
  } catch (error) {
    return next(error)
  }
}
