import puppeteer from "puppeteer";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const extractDomain = (urlString) => {
  try {
    const url = new URL(urlString);
    const hostname = url.hostname;
    const domainParts = hostname.split('.');
    const domain = domainParts.slice(-2).join('.');
    return domain.split('.').slice(-2, -1)[0]; // Extract the main domain part 
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

export const scrape = async (url) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1024 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await sleep(2000)
    const domainName = extractDomain(url);

    console.log("domainName", domainName)

    switch (domainName) {
      case "jobteaser":
        try {
          (await page.$("span.didomi-continue-without-agreeing")).click();
          await sleep(2000)
          break;
        } catch (error) {
          break;
        }
      case "hellowork":
        try {
          (await page.$("button#hw-cc-notice-continue-without-accepting-btn")).click();
          await sleep(2000)
          break;
        } catch (error) {
          break;
        }
        
      case "gouv":
        try {
          await sleep(5000)
          break;
        } catch (error) {
          break;
        }
      default:
        break;
    }

    const htmlContent = await page.content();

    // Fermez le navigateur
    await browser.close();

    return htmlContent
  } catch (error) {
    await browser.close()
    return error
  } 
};
