const puppeteer = require("puppeteer");
require("dotenv").config();

const isEnrollmentReq = (req) =>
  req.resourceType() === "fetch" && req.url().includes("enrollment");

const isEnrollmentPinned = (enrollment) =>
  enrollment.actions[0].name === "unpin-course";

const hasOrgRel = (enrollmentLink) =>
  enrollmentLink.rel[0] === "https://api.brightspace.com/rels/organization";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://gastate.view.usg.edu/d2l/home");

  // go to login page
  await page.waitForSelector('a[href*="login"]');
  await page.click('a[href*="login"]');

  // input login
  await page.waitForSelector('input[name="loginForm:username"]');
  await page.type('input[name="loginForm:username"]', process.env.CAMPUS_ID);

  // input password
  await page.waitForSelector('input[name="loginForm:password"]');
  await page.type('input[name="loginForm:password"]', process.env.PASSWORD);

  // submit login form
  await page.waitForSelector('input[name="loginForm:loginButton"]');

  // await navigation that results from login form submission
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[name="loginForm:loginButton"]'),
  ]);

  // collect pinned organization ids
  const orgIds = new Set();
  page.on("response", async (res) => {
    const req = res.request();
    if (isEnrollmentReq(req)) {
      const enrollment = await res.json();
      if (isEnrollmentPinned(enrollment)) {
        for (link of enrollment.links) {
          if (hasOrgRel(link)) {
            const orgId = link.href.split("/").pop();
            orgIds.add(orgId);
          }
        }
      }
      console.log(orgIds.values());
    }
  });

  //   await browser.close();
})();
