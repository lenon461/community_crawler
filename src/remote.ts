import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path'
import { Posts, Post, PostPayload } from './Post';
import { selector } from './selector';

export async function scrapyPosts(pageNumberOffset: number, pageNumberLimit: number, site: selector): Promise<Post[]> {

    const browserOption = {
        // slowMo: 500, // 디버깅용으로 퍼핏티어 작업을 지정된 시간(ms)만큼 늦춥니다.
        // headless: false, // 디버깅용으로 false 지정하면 브라우저가 자동으로 열린다.
        args: [
            '--no-sandbox' , '--disable-setuid-sandbox'
        ]
    };
    const browser = await puppeteer.launch(browserOption);

    const pageOption = {
        // waitUntil: "load",// waitUntil: networkidle2 적어도 500ms 동안 두 개 이상의 네트워크 연결이 없으면 탐색이 완료된 것으로 간주합니다.
        timeout: 3000000 //timeout: 20초 안에 새 탭의 주소로 이동하지 않으면 에러 발생
    };
    const page = await browser.newPage();
    const { sitename, url, pageurl, selector } = site;
    const { list, children, title, author, up, updated, link } = selector;
    const posts = []

    for (let i = pageNumberOffset; i <= pageNumberLimit; i++) {
        const endpoint = `${pageurl}${i}`;
        const response = await page.goto(endpoint, pageOption);

        if (response !== null) {
            const html = await response.text();
            const $ = cheerio.load(html);
            const $list = $(list).children(children);

            for (let index = 0; index < $list.length; index++) {
                const ele = cheerio($list[index]);
                const post: PostPayload = {
                    title: ele.find(title).text(),
                    author: ele.find(author).text(),
                    up: ele.find(up).text(),
                    updated: ele.find(updated).text(),
                    link: ele.find(link).attr('href'),
                };
                posts.push(post);
            }
        }
    }
    await page.close();
    await browser.close();
    return posts.map(payload => new Post(payload))

}