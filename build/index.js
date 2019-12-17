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
const remote_1 = require("./src/remote");
const selector_1 = __importDefault(require("./src/selector"));
const write_1 = require("./src/write");
const fast_levenshtein_1 = __importDefault(require("fast-levenshtein"));
const datastore_1 = require("@google-cloud/datastore");
const datastore = new datastore_1.Datastore({
    projectId: 'tribal-isotope-228803',
    keyFilename: 'tribal-isotope-228803-8d000bd04e4c.json'
});
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
                    result.push(`<a href="${link}">${title1}</a>\n`);
                }
            });
        });
        console.log(result);
        return result;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const kindName = 'posts';
        const posts1 = yield remote_1.scrapyPosts(1, 20, selector_1.default[0]);
        const posts2 = yield remote_1.scrapyPosts(1, 20, selector_1.default[1]);
        yield (write_1.writeFile(posts1, selector_1.default[0]), write_1.writeFile(posts2, selector_1.default[1]));
        let message = yield compare(posts1, posts2);
        console.log('message is loaded');
        yield datastore.save({
            key: datastore.key(kindName),
            data: {
                data: JSON.stringify(message) + '\n',
                createdAt: new Date(),
                excludeFromIndexes: true
            }
        });
        console.log('message is saved');
        return message;
        // return await compare( JSON.parse(await readFile(sites[0])), JSON.parse(await readFile(sites[1])) )
    });
}
exports.main = main;
main();
setInterval(function () {
    main();
}, 1000 * 60 * 60 * 24);
exports.fuc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts1 = yield remote_1.scrapyPosts(1, 10, selector_1.default[0]);
        const posts2 = yield remote_1.scrapyPosts(1, 10, selector_1.default[1]);
        console.log('message is loading');
        let message = yield compare(posts1, posts2);
        // await datastore.save({
        //     key: datastore.key(kindName),
        //     data: {
        //         data: JSON.stringify(message) + '\n',
        //         createdAt: new Date()
        //     }
        // })    
    }
    catch (error) {
        console.error('ERROR:', error);
    }
});
