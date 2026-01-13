const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 5000;

// Parse JSON
app.use(express.json());

// Load your JSON file
const docs = JSON.parse(fs.readFileSync('docs.json'));

// Route to get all docs
app.get('/api/docs', (req, res) => {
  res.json(docs);
});

// Route to get topic by name
app.get('/api/docs/:topic', (req, res) => {
  const topic = req.params.topic.toLowerCase();
  if (docs.topics[topic]) {
    res.json(docs.topics[topic]);
  } else {
    res.status(404).json({ error: 'Topic not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
