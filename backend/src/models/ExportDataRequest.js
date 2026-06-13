import mongoose from 'mongoose'

const exportDataRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'export_data',
      enum: ['export_data'],
      index: true,
    },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'in_review', 'verified', 'completed', 'closed'],
      index: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    accountEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      index: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
    ownershipVerificationAcknowledged: {
      type: Boolean,
      required: true,
      default: false,
    },
    source: {
      type: String,
      default: 'landing-export-data',
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },
  },
  {
    collection: 'exportDataRequests',
    timestamps: true,
  },
)

const ExportDataRequest =
  mongoose.models.ExportDataRequest ||
  mongoose.model('ExportDataRequest', exportDataRequestSchema)

export default ExportDataRequest
