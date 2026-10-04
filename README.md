# Product catalog front end (Vercel)

- `public/index.html`: the web page
- `api/products/[id].js` and `api/products/index.js`: functions that forward requests to the Express API on EC2
- Set the environment variable `BACKEND_URL` in Vercel to `http://<EC2-public-IP>:3000` (no trailing slash)
