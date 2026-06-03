export function notFoundHandler(_req, res) {
  return res.status(404).json({
    success: false,
    message: 'Route not found.',
  })
}

export function errorHandler(error, _req, res, _next) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error.',
  })
}
