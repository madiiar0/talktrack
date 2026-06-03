import mongoose from 'mongoose'

const waitlistEntrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      unique: true,
      index: true,
    },
    honestPrice: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    suggestions: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
    source: {
      type: String,
      default: 'landing-page',
    },
  },
  {
    timestamps: true,
  },
)

const WaitlistEntry = mongoose.model('WaitlistEntry', waitlistEntrySchema)

export default WaitlistEntry
