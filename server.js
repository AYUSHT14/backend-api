const express = require("express");
const fs = require("fs");

const app = express();

// Read JSON file
const docsData = JSON.parse(
  fs.readFileSync("docs.json", "utf-8")
);

// API endpoint
app.get("/api/docs", (req, res) => {
  res.json(docsData);
});

// Single topic
app.get("/api/docs/:topic", (req, res) => {
  const topic = req.params.topic;
  const data = docsData.topics[topic];

  if (!data) {
    return res.status(404).json({ error: "Topic not found" });
  }

  res.json(data);
});

app.listen(5000, () => {
  console.log("API running at http://localhost:5000/api/docs");
});
