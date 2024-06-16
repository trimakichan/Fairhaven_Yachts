import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

// Apply CORS middleware to open up CORS policy for all domains
app.use(cors());

// Proxy endpoint
app.use('/api', createProxyMiddleware({
    target: 'https://api.boats.com', // Target host
    changeOrigin: true, // Needed for virtual hosted sites
    pathRewrite: { '^/api': '' }, // Rewrite the API path
    logLevel: 'debug', // Log level
}));

// Choose a port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
