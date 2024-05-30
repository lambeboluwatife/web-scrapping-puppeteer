const { timeout } = require("puppeteer");
const puppeteer = require("puppeteer");

const run = async () => {
  try {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://www.traversymedia.com", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    //   await page.goto("https://lbdflix.vercel.app/");
    //   await page.goto("https://nkiri.com/");

    //   await page.screenshot({ path: "example.png", fullPage: true });
    // await page.pdf({ path: "example.pdf", format: "A4" });

    // const html = await page.content();

    // const title = await page.evaluate(() => document.title);

    // const text = await page.evaluate(() => document.body.innerText);

    // const links = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll("a"), (e) => e.href)
    // );

    // const courses = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll("#courses .card"), (e) => ({
    //     title: e.querySelector(".card-body h3").innerText,
    //     level: e.querySelector(".card-body .level").innerText,
    //     url: e.querySelector(".card-footer a").href,
    //     promo: e.querySelector(".card-footer .promo-code .promo"),
    //   }))
    // );

    const courses = await page.$$eval("#courses .card", (elements) =>
      elements.map((e) => ({
        title: e.querySelector(".card-body h3").innerText,
        level: e.querySelector(".card-body .level").innerText,
        url: e.querySelector(".card-footer a").href,
        promo: e.querySelector(".card-footer .promo-code .promo"),
      }))
    );

    console.log(courses);

    await browser.close();
  } catch (error) {
    console.error("Error Occurred:", error);
  }
};

run();
