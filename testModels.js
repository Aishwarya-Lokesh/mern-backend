const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listAvailableModels() {
  try {
    console.log('🔍 Checking available Gemini models...');
    console.log('API Key:', process.env.GEMINI_API_KEY ? '✅ Present' : '❌ Missing');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();
    
    console.log('\n📋 AVAILABLE MODELS:');
    models.forEach(model => {
      console.log(`- ${model.name} (Supported methods: ${model.supportedGenerationMethods.join(', ')})`);
    });
    
    // Show recommended models
    console.log('\n💡 RECOMMENDED MODELS TO USE:');
    const recommended = models.filter(model => 
      model.supportedGenerationMethods.includes('generateContent')
    );
    
    recommended.forEach(model => {
      console.log(`- ${model.name}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
    console.error('Full error:', error);
  }
}

listAvailableModels();