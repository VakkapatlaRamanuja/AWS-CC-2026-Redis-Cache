// Forwards a request from Vercel to the Express API running on EC2.
module.exports = async function proxy(path, options = {}) {
  const base = process.env.BACKEND_URL;
  if (!base) {
    return { status: 500, body: { error: 'BACKEND_URL is not set in Vercel environment variables' } };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const r = await fetch(base.replace(/\/$/, '') + path, { ...options, signal: controller.signal });
    const body = await r.json().catch(() => ({ error: 'Backend returned a non-JSON response' }));
    return { status: r.status, body };
  } catch (err) {
    return { status: 502, body: { error: 'Cannot reach the API server. It may be stopped.' } };
  } finally {
    clearTimeout(timer);
  }
};
