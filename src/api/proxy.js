// /api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { url } = req.query;

    console.log(`Received request for URL: ${url}`); //

    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
