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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function writeFile(posts, site) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataPath = path.join(__dirname, '../data');
        if (!fs.existsSync(dataPath)) {
            fs.mkdirSync(dataPath);
            console.log('data dir is not exist.');
        }
        console.log("data dir is created");
        const filePath = path.join(__dirname, '../data', `${site.sitename}.json`);
        const fd = fs.openSync(filePath, 'w');
        // const obj = posts.map(post => {
        //     return {'payload': post}
        // })
        fs.appendFileSync(filePath, JSON.stringify(posts) + '\n');
        console.log("file is writed");
        return;
    });
}
exports.writeFile = writeFile;
function readFile(site) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path.join(__dirname, '../data', `${site.sitename}.json`);
        return fs.readFileSync(filePath, 'utf8');
    });
}
exports.readFile = readFile;
