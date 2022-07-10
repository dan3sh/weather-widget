// Async helpers

/**
 * @param {string} url
 * @returns {Promise<object>}
 */
export async function getJSON(url) {
  return doJSON(url, 'GET')
}

/**
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @returns {Promise<object>}
 */
async function doJSON(url, method, body) {
  /** @type RequestInit */
  let options = {
    method,
    headers: { 'Content-Type': 'application/json'},
  }

  if (body) {
    options = {...options, body: JSON.stringify(body)}
  }
  return await ( await fetch(url, options)).json()
}
