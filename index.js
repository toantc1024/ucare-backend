require("dotenv").config();

// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;

// CORS
const cors = require("cors");
const generateQuiz = require("./generator");
const { responseMessage } = require("./routes/assistant/bot");
app.use(cors());
app.use(express.json());
// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Listen on get request
app.post("/message", async (req, res) => {
  const { text, number } = req.body;
  const response = await responseMessage(text);

  res.send(JSON.stringify({ response }));
});
