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
function write() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield write_1.writeFile(1, 100, selector_1.default[0]); //dogdrip
            console.log('site1 write End');
            yield write_1.writeFile(1, 100, selector_1.default[1]); //fmkorea
            console.log('site2 write End');
        }
        catch (error) {
        }
    });
}
let i = 0;
function compare() {
    return __awaiter(this, void 0, void 0, function* () {
        const data1 = JSON.parse(yield write_1.readFile(selector_1.default[0]));
        const data2 = JSON.parse(yield write_1.readFile(selector_1.default[1]));
        data1.map((ele1) => {
            data2.map((ele2) => {
                const title1 = ele1.payload.title;
                const title2 = ele2.payload.title;
                const distance = fast_levenshtein_1.default.get(title1, title2);
                if (distance < 3) {
                    console.log(distance, title1, title2);
                }
            });
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield write();
        compare();
    });
}
main();
// var distance = levenshtein.get('흠가나다라마바사', '가나다아자카타파')
// console.log(distance)
// var distance = levenshtein.get('우리가 저렇게', '우리가 저렇게')
// console.log(distance)
// var distance = levenshtein.get('우리가 저렇게a', 'bwbafaf@@s')
// console.log(distance)
