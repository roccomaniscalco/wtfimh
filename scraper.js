const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://gastate.view.usg.edu/d2l/home");

  // match anchor with "login" substring in href
  await page.waitForSelector('a[href*="login"]');
  await page.click('a[href*="login"]');

  // match input with "loginForm:username" name
  // input CAMPUS_ID from .env file
  await page.waitForSelector('input[name="loginForm:username"]');
  await page.type('input[name="loginForm:username"]', process.env.CAMPUS_ID);

  // match input with "loginForm:password" name
  // input PASSWORD from .env file
  await page.waitForSelector('input[name="loginForm:password"]');
  await page.type('input[name="loginForm:password"]', process.env.PASSWORD);

  // match input with "loginForm:loginButton" name
  await page.waitForSelector('input[name="loginForm:loginButton"]');
  await page.click('input[name="loginForm:loginButton"]');

  await browser.close();
})();
