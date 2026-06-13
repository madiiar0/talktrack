import mongoose from 'mongoose'

const contactRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'contact',
      enum: ['contact'],
      index: true,
    },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'in_review', 'closed'],
      index: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      index: true,
    },
    appUserEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      default: '',
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
    source: {
      type: String,
      default: 'landing-contact',
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },
  },
  {
    collection: 'contactRequests',
    timestamps: true,
  },
)

const ContactRequest =
  mongoose.models.ContactRequest ||
  mongoose.model('ContactRequest', contactRequestSchema)

export default ContactRequest
