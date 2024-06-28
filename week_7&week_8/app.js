const puppeteer = require('puppeteer');
const {getGroqChatCompletion} = require('./groq.ai')
const {readBasePromptForInput, readBasePromptForSubmitSearch} = require("./read.prompt");

async function autoSearch(url, keyword) {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null})
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: "load", timeout: 0})
    const inputs = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('input, textarea');
        return Array.from(nodeList).map(element => ({
            className: element.getAttribute('class'),
            id: element.getAttribute('id'),
            name: element.getAttribute('name'),
            type: element.getAttribute('type'),
            placeholder: element.getAttribute("placeholder"),
        }));

    })
    // handle tracing the input
    let rawDataInput = []
    for (let input of inputs) {
        rawDataInput.push(input)
    }
    const chatCompletionInput = await getGroqChatCompletion(await readBasePromptForInput(), JSON.stringify(rawDataInput))
    const processedDataInput = JSON.parse(chatCompletionInput.choices[0]?.message?.content) || "";
    console.log(processedDataInput)
    processedDataInput.map(async (element) => {
        if (element.id) {
            try {
                const id = element.id
                return await page.evaluate((id, keyword) => {
                    document.querySelectorAll("#" + id).forEach(input => {
                        input.value = keyword
                        input.focus()
                    })
                }, id, keyword)
            } catch (e) {
            }
        }
        if (element.className) {
            try {
                const convertClassName = element.className.split(' ').join('.')
                return await page.evaluate((convertClassName, keyword) => {
                    const input = document.querySelector("." + convertClassName)
                    input.value = keyword
                    input.focus()
                }, convertClassName, keyword)
            } catch (e) {
            }
        }
        if (element.name) {
            try {
                const name = element.name
                return await page.evaluate((keyword, name) => {
                    document.querySelectorAll(`[name=${name}]`).forEach(input => {
                        input.value = keyword
                        input.focus()
                    })
                }, keyword, name)
            } catch (e) {
            }
        }
        if (element.placeholder) {
            try {
                const placeholder = element.placeholder
                return await page.evaluate((keyword, placeholder) => {
                    document.querySelectorAll(`[placeholder=${placeholder}]`).forEach(input => {
                        input.value = keyword
                        input.focus()
                    })
                }, keyword, placeholder)
            } catch (e) {
            }
        }
    })

    // handle tracing the submit button and submit or enter
    const buttons = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('button');
        return Array.from(nodeList).map(element => ({
            className: element.getAttribute('class'),
            id: element.getAttribute('id'),
            name: element.getAttribute('name'),
            type: element.getAttribute('type'),
            text: element.textContent,
        }));
    })
    let rawDataSubmit = []
    for (let button of buttons) {
        rawDataSubmit.push(button)
    }

    await page.keyboard.press("Enter");
    const uniqueButton = new Set(rawDataSubmit.map(e => JSON.stringify(e)));
    const convertSetToArray = Array.from(uniqueButton).map(e => JSON.parse(e));
    const chatCompletionSubmit = await getGroqChatCompletion(await readBasePromptForSubmitSearch(), JSON.stringify(convertSetToArray));
    let processedDataSubmit
    try {
        processedDataSubmit = JSON.parse(chatCompletionSubmit.choices[0]?.message?.content) || "";
    } catch (e) {

    }
    console.log(processedDataSubmit)
    processedDataSubmit?.map(async (element) => {
        if (element.id) {
            try {
                const id = element.id
                return await page.evaluate((id) => {
                    document.querySelectorAll("#" + id).forEach(input => {
                        input.click()
                    })
                }, id)
            } catch (e) {
            }
        }
        if (element.className) {
            try {
                const convertClassName = element.className.split(' ').join('.')
                return await page.evaluate((convertClassName, keyword) => {
                    const input = document.querySelector("." + convertClassName)
                    input.value = keyword
                    input.focus()
                }, convertClassName, keyword)
            } catch (e) {
            }
        }
        if (element.name) {
            try {
                const name = element.name
                return await page.evaluate((name) => {
                    document.querySelector(`[name=${name}]`).forEach(input => {
                        input.click()
                    })
                }, name)
            } catch (e) {
            }
        }
        if (element.type === 'submit') {
            try {
                return await page.evaluate(() => {
                    document.querySelectorAll('button[type=submit]').forEach(input => {
                        input.click()
                    })
                })
            } catch (e) {
            }
        }
    })
}

autoSearch('https://www.kidney.org', 'cancer')
