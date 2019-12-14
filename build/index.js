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
const remote_1 = require("./remote");
const selector_1 = __importDefault(require("./selector"));
const write_1 = require("./write");
const fast_levenshtein_1 = __importDefault(require("fast-levenshtein"));
// export async function writeFile22(posts: Post[], site: selector): Promise<void>{
//     let curStartPageNumber = pageNumberOffset;
//     let curEndPageNumber = 10;
//     const file = `../data/${site.sitename}.json`
//     if (!fs.existsSync(file)) {
//         fs.mkdirSync('../data');
//         fs.writeFileSync(file, '\n');
//     }
//     while(pageNumberLimit >= curEndPageNumber){
//         const posts = await scrapyPosts(curStartPageNumber, curEndPageNumber, site);
//         const obj = posts.map(post => {
//             return {'payload': post}
//         })
//         fs.appendFileSync(file, JSON.stringify(obj)+ '\n');
//         console.log(curStartPageNumber +' page ~ ' + curEndPageNumber + ' page write End');
//         curStartPageNumber += 10;
//         curEndPageNumber += 10;
//     }
// }
function write() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await writeFile(1, 10, sites[0]); //dogdrip
            // console.log('site1 write End');
            // await writeFile(1, 10, sites[1]); //fmkorea
            // console.log('site2 write End');
        }
        catch (error) {
        }
    });
}
let i = 0;
function compare(Posts1, Posts2) {
    return __awaiter(this, void 0, void 0, function* () {
        Posts1.map((post1) => {
            Posts2.map((post2) => {
                const title1 = post1.title;
                const title2 = post2.title;
                const distance = fast_levenshtein_1.default.get(title1, title2);
                if (title1 !== '' && title1.length > 5 && title2 !== '' && title2.length > 5 && distance < 5) {
                    console.log(distance, title1, title2);
                }
            });
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts1 = yield remote_1.scrapyPosts(1, 21, selector_1.default[0]);
        const posts2 = yield remote_1.scrapyPosts(1, 21, selector_1.default[1]);
        yield (write_1.writeFile(posts1, selector_1.default[0]), write_1.writeFile(posts2, selector_1.default[1]));
        compare(JSON.parse(yield write_1.readFile(selector_1.default[0])), JSON.parse(yield write_1.readFile(selector_1.default[1])));
    });
}
main();
