const fs = require("fs")

const readFilePrompt = async (nameFile) => {
    const basePrompt = fs.readFileSync(`/Users/lequang/Desktop/LIZAI/LIZAI_PROGRAM/week_9&week10&week11/prompt/${nameFile}`, 'utf8')
    return basePrompt
}

module.exports = {readFilePrompt}
