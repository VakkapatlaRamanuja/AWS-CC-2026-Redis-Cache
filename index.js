const proxy = require('../_proxy');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, description, price, category } = req.body || {};
  const { status, body } = await proxy('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price, category })
  });
  res.status(status).json(body);
};
