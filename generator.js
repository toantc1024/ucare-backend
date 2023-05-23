require("dotenv").config();
// const { Configuration, OpenAIApi } = require("openai");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-tnUJAJ4Vn6MMj8OggJwzy55w",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const axios = require("axios");
const generateQuiz = async (passage, numQuestions) => {
  console.log("PROCESSING..");
  try {
    const prompt = `
    
    
    Tạo một câu quizz từ đoạn văn sau: ${passage}
    \nQuestion title?\nA. Option A\nB. Option B \nC. Option C \nD. Option D \nAnswer: Answer text\n


    `;
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: prompt,
        max_tokens: 1000,
        n: numQuestions,
        stop: "\n\n",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const checkValidAnswer = (answer) => {
      const validAnswers = ["A.", "B.", "C.", "D."];
      return validAnswers.includes(answer);
    };

    const choices = response.data.choices.map((choice) => {
      try {
        const lines = choice.text.split("\n").filter((line) => line.length > 0);

        const question = lines[0];
        const options = lines.slice(1, 5);
        const answer = lines[5].split("Answer: ")[1];

        return {
          question,
          options,
          answer,
        };
        console.log({ question, options, answer });
      } catch {
        console.log("ERROR");
        return null;
      }
    });
    // filter null from choices
    const filteredChoices = choices.filter((choice) => choice !== null);
    console.log(filteredChoices);
    return { choices: filteredChoices };
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

module.exports = generateQuiz;
