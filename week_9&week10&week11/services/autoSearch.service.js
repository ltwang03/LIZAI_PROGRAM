const {readFilePrompt} = require("../shared/fs/readPrompt")
const {getGroqChatCompletion} = require("../shared/groq/groq")
const puppeteer = require('puppeteer');
const rabbitmq = require("../shared/rabbitmq/rabbitmq")
const SitesRepository = require("../shared/database/repositories/sites.repository")
const CrawlStatusRepository = require("../shared/database/repositories/crawlStatus.repository")
const url = require('node:url');

async function autoSearch(url, keyword) {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null})
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: "load", timeout: 0})
    let getSite = await SitesRepository.getSites(url)
    if (!getSite) {
        getSite = await SitesRepository.createSite(url)
    }
    let getStatusCrawlStatus = await CrawlStatusRepository.getCrawlStatus(getSite.id, keyword)
    if (!getStatusCrawlStatus) {
        getStatusCrawlStatus = await CrawlStatusRepository.createCrawlStatus(getSite.id, keyword)
    }
    console.log(getSite)
    console.log(getStatusCrawlStatus)

    // handle tracing the input
    let processedDataInput;
    if (getSite.element_input.length === 0) {
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
        let rawDataInput = []
        for (let input of inputs) {
            rawDataInput.push(input)
        }
        const chatCompletionInput = await getGroqChatCompletion(await readFilePrompt("prompt-input.txt"), JSON.stringify(rawDataInput))
        processedDataInput = JSON.parse(chatCompletionInput.choices[0]?.message?.content) || "";
        await SitesRepository.updateSite(url, {element_input: processedDataInput})
    } else {
        processedDataInput = getSite.element_input
    }
    console.log("input", processedDataInput)
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
    let processedDataSubmit
    if (!getSite.element_submit) {
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
        const uniqueButton = new Set(rawDataSubmit.map(e => JSON.stringify(e)));
        const convertSetToArray = Array.from(uniqueButton).map(e => JSON.parse(e));
        const chatCompletionSubmit = await getGroqChatCompletion(await readFilePrompt("prompt-submit.txt"), JSON.stringify(convertSetToArray));

        try {
            processedDataSubmit = JSON.parse(chatCompletionSubmit.choices[0]?.message?.content) || "";
        } catch (e) {

        }
        await SitesRepository.updateSite(url, {element_submit: processedDataSubmit})
    } else {
        processedDataSubmit = getSite.element_submit
    }
    console.log("submit", processedDataSubmit)
    await page.keyboard.press("Enter")
    processedDataSubmit.map(async (element) => {
        let submitButton = false;
        if (element.id) {
            try {
                const id = element.id
                await page.evaluate((id) => {
                    document.querySelector("#" + id).forEach(input => {
                        input.click()
                    })
                    submitButton = true
                }, id)
            } catch (e) {
                submitButton = false
            }
        }
        if (submitButton === false && element.className) {
            try {
                const convertClassName = element.className.split(' ').join('.')
                await page.evaluate((convertClassName) => {
                    const input = document.querySelector("." + convertClassName)
                    input.click()
                }, convertClassName, keyword)
                submitButton = true
            } catch (e) {
                submitButton = false
            }
        }
        if (submitButton === false && element.name) {
            try {
                const name = element.name
                await page.evaluate((name) => {
                    document.querySelector(`[name=${name}]`).forEach(input => {
                        input.click()
                    })
                }, name)
                submitButton = true
            } catch (e) {
                submitButton = false
            }
        }
        if (submitButton === false && element.type === 'submit') {
            try {
                await page.evaluate(() => {
                    document.querySelectorAll('button[type=submit]').forEach(input => {
                        input.click()
                    })
                })
                submitButton = true
            } catch (e) {
                submitButton = false
            }
        }
    })
    await delay(page, 2000)
    await page.keyboard.press('Enter');

    //
    // await page.evaluate(async () => {
    //     window.scrollTo(0, document.body.scrollHeight);
    // })
    let processedDataNextButton;
    if (!getSite.element_next) {
        const dataLinks = []
        const links = await page.$$("a, b, button");
        for (const link of links) {
            const href = await (await link.getProperty("href")).jsonValue();
            const className = await (await link.getProperty("className")).jsonValue();
            const text = await (await link.getProperty("text")).jsonValue();
            const title = await (await link.getProperty("title")).jsonValue();
            const selector = await getSelector(page, link)
            dataLinks.push({url: href, text: text, className, selector, title})
        }
        const filteredButton = identifyButtons(dataLinks)
        const chatCompletionNextButton = await getGroqChatCompletion(await readFilePrompt("prompt-next.txt"), JSON.stringify(filteredButton))
        processedDataNextButton = JSON.parse(chatCompletionNextButton.choices[0]?.message?.content) || "";
        console.log(processedDataNextButton)
        await SitesRepository.updateSite(url, {element_next: processedDataNextButton})
    } else {
        processedDataNextButton = getSite.element_next;
    }
    console.log("next", processedDataNextButton)
    let paging = 0
    let resultsLink = []
    if (processedDataNextButton.tag === 'load-more') {
        const startTime = Date.now();
        const minutes = 30 * 1000;
        await page.waitForNavigation({waitUntil: 'networkidle0'})
        while (Date.now() - startTime < minutes) {
            let loadMoreButton = null;
            if (processedDataNextButton.selector) {
                loadMoreButton = await page.$(processedDataNextButton.selector);
            }
            if (!loadMoreButton) {
                break;
            }
            await loadMoreButton.click()
            await delay(page, 2000)
            paging++
        }
        await CrawlStatusRepository.updateCrawlStatus(getSite.id, keyword, {page: paging})
        const divResult = await filteredDivAndGetLink(page);
        resultsLink.push(...divResult)
    }
    await delay(page, 2000)
    if (processedDataNextButton.tag === 'next') {
        const status = getStatusCrawlStatus.status;
        if (status === true && getStatusCrawlStatus.page !== 0) {
            for (let i = 0; i < getStatusCrawlStatus.page; i++) {
                await delay(page, 1000)
                let nextButton = null;
                nextButton = await clickNext(page, processedDataNextButton, nextButton)
                await nextButton.click();
                await page.waitForNavigation({waitUntil: 'load'})
            }
        }

        try {
            const startTime = Date.now();
            const minutes = 2 * 60 * 1000;
            const previousUrls = new Set();
            previousUrls.add(page.url());
            let isStuck = false;
            while (Date.now() - startTime < minutes) {
                let nextButton = null;
                nextButton = await clickNext(page, processedDataNextButton, nextButton)
                if (!nextButton) {
                    await CrawlStatusRepository.updateStatusCrawlStatus(getSite.id, keyword, false)
                    break;
                }
                await delay(page, 1000)
                await nextButton.click();
                try {
                    await page.waitForNavigation({waitUntil: 'load'});
                } catch (e) {
                }
                const currentUrl = page.url();
                console.log(currentUrl)
                if (previousUrls.has(currentUrl)) {
                    isStuck = true;
                    await CrawlStatusRepository.updateStatusCrawlStatus(getSite.id, keyword, false)
                    break;
                } else {
                    previousUrls.add(currentUrl);
                }
                paging++
                const divResult = await filteredDivAndGetLink(page);
                resultsLink.push(...divResult)
                await CrawlStatusRepository.updateStatusCrawlStatus(getSite.id, keyword, true)
            }
            if (isStuck) {
                await CrawlStatusRepository.updateCrawlStatus(getSite.id, keyword, {page: paging})
            } else {
                const currentPageInDb = getStatusCrawlStatus.page;
                await CrawlStatusRepository.updateCrawlStatus(getSite.id, keyword, {page: currentPageInDb + paging})
            }
        } catch (error) {
            console.log(error)
        }
    }
    const queueUrls = "urls"
    const connection = await rabbitmq.connectRabbitMQ()
    const channel = await rabbitmq.createQueue(queueUrls, connection)
    const results = await uniqueLinks(resultsLink);
    const validResults = await filterValidLinks(results);
    validResults.map(async (link) => {
        const data = {crawlStatusId: getStatusCrawlStatus.id, url: link.href, keyword}
        await rabbitmq.sendMessageToQueue(queueUrls, data, channel)
    })
    await browser.close()
}

const filteredDivAndGetLink = async (page) => {
    const allDiv = await page.$$("div, li");
    const excludedClasses = ['hidden', 'header', 'footer', 'hide', 'target', 'display', 'nav', 'menu', "control", "qs", "tab", "collapse", "container", "share", "pane", "pager", "non", "region"];

    const filteredDivInBody = [];
    for (const div of allDiv) {
        const className = await (await div.getProperty("className")).jsonValue();
        const hasAnchorTag = await page.evaluate(el => el.querySelector('a') !== null, div);
        const hasNoNumbers = !/\d/.test(className.trim()); // Kiểm tra xem KHÔNG có số
        if (className.trim() !== '' && !excludedClasses.some(cls => className.includes(cls)) && hasAnchorTag && hasNoNumbers) {
            filteredDivInBody.push({className});
        }
    }
    const divResult = await removeDuplicateDivs(filteredDivInBody);

    return await queryClassNameAndGetLink(page, divResult);
};
const queryClassNameAndGetLink = async (page, divs) => {
    const links = [];
    const formatClassDiv = (className) => {
        return className.split(' ').join('.');
    }
    for (let div of divs) {
        const className = div.className.trim();
        const formattedClassName = formatClassDiv(className);
        const selector = `.${formattedClassName} a`;
        const anchorTags = await page.$$(selector);
        for (const anchorTag of anchorTags) {
            const href = await (await anchorTag.getProperty("href")).jsonValue();
            links.push({className, href});
        }
    }
    return await uniqueLinks(links)
}
const uniqueLinks = async (links) => {
    const uniqueLinks = [];
    const seenLinks = new Set();
    for (const link of links) {
        if (!seenLinks.has(link.href)) {
            seenLinks.add(link.href);
            uniqueLinks.push(link);
        }
    }
    return uniqueLinks;
}
const removeDuplicateDivs = async (filteredDivs) => {
    const uniqueDivs = [];
    const seenClassNames = new Set();

    for (const div of filteredDivs) {
        const className = div.className.trim();
        if (!seenClassNames.has(className)) {
            uniqueDivs.push(div);
            seenClassNames.add(className);
        }
    }
    return uniqueDivs;
}
const clickNext = async (page, processedDataNextButton, nextButton) => {
    if (processedDataNextButton.text) {
        const elements = await page.$$("a, button");
        for (const element of elements) {
            const text = await element.getProperty("innerText"); // Lấy textContent
            const textValue = await text.jsonValue();
            if (textValue === processedDataNextButton.text) {
                nextButton = element;
            }
        }
    }
    if (!nextButton && processedDataNextButton.selector) {
        try {
            nextButton = await page.$(processedDataNextButton.selector);
        } catch (e) {

        }
    }
    if (!nextButton && processedDataNextButton.className) {
        const formattedClassName = processedDataNextButton.className.split(' ').join('.');
        console.log(formattedClassName)
        nextButton = await page.$(`.${formattedClassName}`);
    }
    return nextButton
}
const getSelector = async (page, element) => {
    const selector = await page.evaluate((element) => {
        if (!element) return null;

        const path = [];
        let currentElement = element;
        while (currentElement && currentElement !== document.body) {
            let selector = currentElement.tagName.toLowerCase();

            if (currentElement.id) {
                // Nếu có id, chỉ sử dụng id
                path.unshift(`#${currentElement.id}`);
                break;  // Dừng lại vì id đã đủ để xác định duy nhất
            } else {
                // Chỉ sử dụng các lớp có ý nghĩa
                const classes = Array.from(currentElement.classList)
                    .filter(cls => !cls.startsWith('js-') && !cls.includes('active'))
                    .join('.');
                if (classes) {
                    selector += `.${classes}`;
                }

                // Chỉ thêm nth-child nếu cần thiết
                const siblings = Array.from(currentElement.parentNode?.children)
                    .filter(child => child.tagName === currentElement.tagName);
                if (siblings.length > 1) {
                    const index = siblings.indexOf(currentElement) + 1;
                    selector += `:nth-of-type(${index})`;
                }
            }

            path.unshift(selector);
            currentElement = currentElement.parentNode;
        }

        return path.join(' > ');
    }, element);
    return selector;
};
const identifyButtons = (dataArray) => {
    return dataArray.filter(item => {
        // Kiểm tra text
        if (item.text && /^\d+$|next|previous|last|first|›|‹|»|«/i.test(item.text.trim())) {
            return true;
        }

        // Kiểm tra className
        if (item.className && /page|pagination/i.test(item.className)) {
            return true;
        }

        // Kiểm tra title
        if (item.title && /go to page|next page|previous page|last page|first page/i.test(item.title.toLowerCase())) {
            return true;
        }

        // Kiểm tra selector
        if (item.selector && /pager|pagination/i.test(item.selector)) {
            return true;
        }

        return false;
    });
}
const delay = async (page, time) => {
    try {
        await page.evaluate(async (time) => {
            await new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        }, time)
    } catch (e) {

    }
}
const filterValidLinks = async (results) => {
    return results.filter(result => {
        try {
            const infoLink = url.parse(result.href);
            if (infoLink.protocol === "http:" || infoLink.protocol === "https:") {
                return true;
            } else {
                return false
            }
        } catch (e) {
            return false;
        }
    });
}

module.exports = {autoSearch}
