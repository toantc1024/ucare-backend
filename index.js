require("dotenv").config();

// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;

// CORS
const cors = require("cors");

const { extractKeyword, responseMessage } = require("./routes/assistant/bot");
app.use(cors());
app.use(express.json());
// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Listen on get request
app.post("/message", async (req, res) => {
  const { text } = req.body;
  console.log("Received request from client", text);
  const response = await responseMessage(text);
  res.send(JSON.stringify({ response }));
});

app.post("/api/filter", async (req, res) => {
  const { text } = req.body;
  console.log("Keyword", text);
  const response = await extractKeyword(text);
  res.send(JSON.stringify({ response }));
});
