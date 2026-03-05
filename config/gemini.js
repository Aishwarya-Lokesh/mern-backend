const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateChatResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(message);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("AI response generation failed");
  }
};

module.exports = { generateChatResponse };
