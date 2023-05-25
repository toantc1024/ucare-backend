const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const responseMessage = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${text}}`,
    max_tokens: 250,
    temperature: 0,
  });
  return response.data.choices;
};

module.exports = { responseMessage };
