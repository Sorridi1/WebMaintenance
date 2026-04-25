export function ok(res, data = null, message = 'success') {
  return res.json({ code: 0, message, data });
}

export function fail(res, message = 'error', code = 1, httpStatus = 400) {
  return res.status(httpStatus).json({ code, message, data: null });
}
