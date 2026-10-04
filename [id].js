const proxy = require('../_proxy');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { status, body } = await proxy(`/products/${encodeURIComponent(req.query.id)}`);
  res.status(status).json(body);
};
