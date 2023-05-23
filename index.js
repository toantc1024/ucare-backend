require("dotenv").config();

// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// CORS
const cors = require("cors");
const generateQuiz = require("./generator");
app.use(cors());
app.use(express.json());
// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const passage =
  "Trong các loại quả chứa hàm lượng dinh dưỡng cao, bí đỏ được xếp ở vị trí đầu tiên. Trong bí đỏ có chứa sắt, kali, phosphor, nước, protein thực vật, gluxit,.. các axit béo linoleic, cùng các vitamin C, vitamin B1, B2, B5, B6, PP. Ăn bí đỏ rất tốt cho não bộ, làm tăng cường miễn dịch, giúp tim khỏe mạnh, mắt sáng, cho giấc ngủ ngon hơn và hỗ trợ cho việc chăm sóc da cũng như làm đẹp, giúp giảm cân...";

const numQuestions = 5;

const generate = async (passage, numQuestions) => {
  const quizzes = await generateQuiz(passage, numQuestions);
  return quizzes;
};

// Listen on get request
app.post("/get", async (req, res) => {
  const { text, number } = req.body;
  const response = await generate(text, parseInt(number));
  res.send(response);
});
