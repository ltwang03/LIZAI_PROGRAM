const fs = require('fs')

const readBasePromptForInput = async () => {
    const basePrompt = fs.readFileSync('prompt-input.txt', 'utf8')
    return basePrompt
}
const readBasePromptForSubmitSearch = async () => {
    const basePrompt = fs.readFileSync('prompt-submit.txt', 'utf8')
    return basePrompt
}

module.exports = {readBasePromptForInput, readBasePromptForSubmitSearch}
