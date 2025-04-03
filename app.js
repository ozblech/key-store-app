const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());

const url = 'mongodb://mongodb:27017'; // Service name from Helm install
const dbName = 'kvstore';
let db;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    app.listen(8000, () => console.log('Running on port 8000'));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

app.get('/:key', async (req, res) => {
  try {
    const value = await db.collection('store').findOne({ key: req.params.key });
    res.json({ key: req.params.key, value: value ? value.value : null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/:key', async (req, res) => {
  try {
    const { value } = req.body;
    await db.collection('store').updateOne(
      { key: req.params.key },
      { $set: { key: req.params.key, value } },
      { upsert: true }
    );
    res.json({ key: req.params.key, value });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});