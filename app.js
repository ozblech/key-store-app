const express = require('express');
const app = express();
const store = {};

app.use(express.json());

app.get('/:key', (req, res) => {
    try {
        const value = store[req.params.key];
        res.json({ key: req.params.key, value: value || null });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/:key', (req, res) => {
    try {
        const { value } = req.body;
        store[req.params.key] = value;
        res.json({ key: req.params.key, value });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(8000, () => console.log('Running on port 8000'));

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});