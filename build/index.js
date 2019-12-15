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
const selector_1 = __importDefault(require("./selector"));
const write_1 = require("./write");
const fast_levenshtein_1 = __importDefault(require("fast-levenshtein"));
function compare(Posts1, Posts2) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        Posts1.map((post1) => {
            Posts2.map((post2) => {
                const title1 = post1.title;
                const title2 = post2.title;
                const distance = fast_levenshtein_1.default.get(title1, title2);
                const link = post1.link;
                if (title1 !== '' && title1.length > 5 && title2 !== '' && title2.length > 5 && distance < 5) {
                    console.log(distance, title1, link);
                    result.push(`${title1} \n link\n`);
                }
            });
        });
        return result;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const posts1 = await scrapyPosts(1, 21, sites[0]);
        // const posts2 = await scrapyPosts(1, 21, sites[1]);
        // await ( writeFile(posts1, sites[0]), writeFile(posts2, sites[1]) );
        return yield compare(JSON.parse(yield write_1.readFile(selector_1.default[0])), JSON.parse(yield write_1.readFile(selector_1.default[1])));
    });
}
exports.main = main;
main();
