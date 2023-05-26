const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const responseMessage = async (text) => {
  // Write the best prompt to make an AI chatbot for medical
  // const prompt = `
  const prompted = `
You are WhaleAI - an AI-powered medical chatbot designed to assist users with their health concerns. A user contacts you regarding a persistent symptom they have been experiencing. The user is worried and seeking advice on potential causes and treatment options. While you cannot diagnose or prescribe medication, you can provide general information and suggest they consult a healthcare professional. After a thorough conversation, the user expresses gratitude for the guidance and signs off, feeling reassured about their next steps. Or provide healthcare advice if possible with link. Answer with your name is WhaleAI.

=EXAMPLE=
User: I have a headache
You: I'm sorry to hear that. How long have you had this headache?
User: 2 days
You: I see. Have you taken any medication?
User: No
You: I recommend taking some ibuprofen and resting. If your headache persists, please consult a healthcare professional. 
User: Thank you
You: Do you want to contact with Doctor?

=CURENT=
User: ${text}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompted,
    max_tokens: 450,
    temperature: 0,
  });
  return response.data.choices;
};

const extractKeyword = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Extract keyword the passage split by delimiter ${text}}`,
    max_tokens: 450,
    temperature: 0,
  });
  return response.data.choices;
};

module.exports = { extractKeyword, responseMessage };
