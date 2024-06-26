const {Groq} = require("groq-sdk")
require('dotenv').config()
const groq = new Groq({apiKey: process.env.GROQ_API_KEY})
const getGroqChatCompletion = async (prompt, data) => {
    return groq.chat.completions.create({
        messages: [{
            role: "user",
            content: (prompt + data)

        }],
        model: "llama3-70b-8192"
    })
}

module.exports = {getGroqChatCompletion}
