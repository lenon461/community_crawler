const {BrowserWindow, app} = require("electron");
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");

const main = async () => {
  const browser = await pie.connect(app, puppeteer);
 
  const window = new BrowserWindow();
  const url = "http://gw.korens.com/servlet/UAct?cmd=AppBox&boxDv=0&articlesPerPage=100/";
  await window.loadURL(url);
 
  const page = await pie.getPage(browser, window);
  console.log(page.url());
  window.destroy();
};

main();