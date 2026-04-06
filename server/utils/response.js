// Standard API response format
function success(res, data, source = 'api', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    source,
    timestamp: new Date().toISOString()
  });
}

function error(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
}

module.exports = { success, error };
