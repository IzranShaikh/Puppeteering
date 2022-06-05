const puppeteer = require("puppeteer");

let url = "https://typing-speed-test.aoeu.eu/";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.nextword');
    const words = await page.evaluate(() => {
        const wordElements = document.querySelectorAll('.nextword');
        const wordList = [ document.querySelector('.currentword').textContent ];
        wordElements.forEach((word) => {
            wordList.push(word.textContent);
        });
        return wordList;
    })
    
    for (let i = 0; i < words.length; i++) {
        await page.type('#input', words[i]);
        await page.keyboard.press(String.fromCharCode(32));
    }

    await page.waitForSelector('#score #highscore');

    await page.screenshot({ path: './images/typingwebsite.png' });

    // await browser.close();
})();