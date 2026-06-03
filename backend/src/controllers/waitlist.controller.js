import WaitlistEntry from '../models/WaitlistEntry.js'

const MAX_LENGTHS = {
  name: 120,
  contact: 160,
  honestPrice: 80,
  suggestions: 2000,
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

export async function createWaitlistEntry(req, res, next) {
  try {
    const { payload, error } = validateWaitlistPayload(req.body || {})

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }

    try {
      await WaitlistEntry.create(payload)
    } catch (entryError) {
      if (entryError?.code === 11000) {
        return res.status(200).json({
          success: true,
          message: 'You are already on the waitlist.',
        })
      }

      throw entryError
    }

    return res.status(201).json({
      success: true,
      message: 'You are on the waitlist.',
    })
  } catch (error) {
    return next(error)
  }
}

export async function getWaitlistCount(_req, res, next) {
  try {
    const count = await WaitlistEntry.countDocuments()

    return res.status(200).json({
      success: true,
      count,
    })
  } catch (error) {
    return next(error)
  }
}
