"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio_1 = __importDefault(require("cheerio"));
const Post_1 = require("./Post");
function scrapyPosts(pageNumberOffset, pageNumberLimit, site) {
    return __awaiter(this, void 0, void 0, function* () {
        const browserOption = {
            // slowMo: 500, // 디버깅용으로 퍼핏티어 작업을 지정된 시간(ms)만큼 늦춥니다.
            headless: false // 디버깅용으로 false 지정하면 브라우저가 자동으로 열린다.
        };
        const browser = yield puppeteer_1.default.launch(browserOption);
        const pageOption = {
            // waitUntil: 'networkidle2',// waitUntil: 적어도 500ms 동안 두 개 이상의 네트워크 연결이 없으면 탐색이 완료된 것으로 간주합니다.
            timeout: 3000000 //timeout: 20초 안에 새 탭의 주소로 이동하지 않으면 에러 발생
        };
        const page = yield browser.newPage();
        const { sitename, url, pageurl, selector } = site;
        const { list, children, title, author, up, updated, link } = selector;
        const posts = [];
        for (let i = pageNumberOffset; i <= pageNumberLimit; i++) {
            const endpoint = `${pageurl}${i}`;
            const response = yield page.goto(endpoint, pageOption);
            if (response !== null) {
                const html = yield response.text();
                const $ = cheerio_1.default.load(html);
                const $list = $(list).children(children);
                for (let index = 0; index < $list.length; index++) {
                    const ele = cheerio_1.default($list[index]);
                    const post = {
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
        yield page.close();
        yield browser.close();
        return posts.map(payload => new Post_1.Post(payload));
    });
}
exports.scrapyPosts = scrapyPosts;
