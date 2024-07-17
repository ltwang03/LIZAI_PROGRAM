const {Groq} = require("groq-sdk")
const {groqAI} = require("../../configs/index")

require('dotenv').config()
const groq = new Groq({apiKey: groqAI.api_key})
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
