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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const remote_1 = require("./remote");
const fs = __importStar(require("fs"));
function writeFile(pageNumberOffset, pageNumberLimit, site) {
    return __awaiter(this, void 0, void 0, function* () {
        let curStartPageNumber = pageNumberOffset;
        let curEndPageNumber = 10;
        while (pageNumberLimit >= curEndPageNumber) {
            const posts = yield remote_1.scrapyPosts(curStartPageNumber, curEndPageNumber, site);
            const obj = posts.map(post => {
                return { 'payload': post };
            });
            const file = `../data/${site.sitename}.json`;
            fs.appendFileSync(file, JSON.stringify(obj) + '\n');
            console.log(curStartPageNumber + ' page ~ ' + curEndPageNumber + ' page write End');
            curStartPageNumber += 10;
            curEndPageNumber += 10;
        }
    });
}
exports.writeFile = writeFile;
function readFile(site) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = `../data/${site.sitename}.json`;
        return fs.readFileSync(file, 'utf8');
    });
}
exports.readFile = readFile;
