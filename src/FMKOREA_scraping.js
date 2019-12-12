const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

async function scraping() {
  function extractNewsData(html, count) {
    const newsDatas = [];
    const newsData = {
      title: null,
      up: null,
      updated: null,
      author: null,
    };

    // cheerio 라이브러리를 사용하여 html을 DOM 으로 파싱합니다.
    const $ = cheerio.load(html);
    // meta 태그만 추출합니다
    const $newslist = $('#bd_189545458_0 > div > div.fm_best_widget._bd_pc > ul').children("li");
    for (let index = 0; index < $newslist.length; index += 1) {
        const element = cheerio($newslist[index]);
        newsData.id = (index + 1) + count * 20;
        newsData.title = element.find('li > div > h3 > a').text();
        newsData.up = element.find('li > div > a.pc_voted_count.pc_voted_count_plus.pc_voted_count_short > span.count').text();
        newsData.updated = element.find('li > div > div > span.regdate').text();
        newsData.author = element.find("li > div > div > span.author").text();
        if(newsData.title == '') continue;
        newsDatas.push(newsData);
        fs.appendFile('./FMKOREA.json', JSON.stringify(newsData)+ '\n', (err) => {
            if(err) console.log(err)
        });
    }
  } // end extractNewsDate()

  const browserOption = {
    // slowMo: 500, // 디버깅용으로 퍼핏티어 작업을 지정된 시간(ms)만큼 늦춥니다.
    // headless: false // 디버깅용으로 false 지정하면 브라우저가 자동으로 열린다.
  };
  const browser = await puppeteer.launch(browserOption);
  const page = await browser.newPage();

  let response;
  let final = [];
  for(let i = 1; i < 11; i++){
    const url =
    'https://www.fmkorea.com/index.php?mid=best&page=' + i;
    const pageOption = {
    //   waitUntil: 'networkidle2',// waitUntil: 적어도 500ms 동안 두 개 이상의 네트워크 연결이 없으면 탐색이 완료된 것으로 간주합니다.
    //   timeout: 2000 //timeout: 20초 안에 새 탭의 주소로 이동하지 않으면 에러 발생
    };
    response = await page.goto(url, pageOption);
    html = await response.text();
    extractNewsData(html, i);
    
  }
  await page.close(); 
  await browser.close();


  // 크롤링 결과
  return final;
}

scraping()
