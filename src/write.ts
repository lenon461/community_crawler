import {scrapyPosts} from './remote'
import {selector} from './selector';
import * as fs from 'fs';

export async function writeFile(pageNumberOffset: number, pageNumberLimit: number, site: selector): Promise<void>{
    
    let curStartPageNumber = pageNumberOffset;
    let curEndPageNumber = 10;

    while(pageNumberLimit >= curEndPageNumber){
        const posts = await scrapyPosts(curStartPageNumber, curEndPageNumber, site);
        const obj = posts.map(post => {
            return {'payload': post}
        })
        const file = `../data/${site.sitename}.json`
        fs.appendFileSync(file, JSON.stringify(obj)+ '\n');
        
        console.log(curStartPageNumber +' page ~ ' + curEndPageNumber + ' page write End');
        curStartPageNumber += 10;
        curEndPageNumber += 10;
    }
}


export async function readFile(site: selector): Promise<string>{
    
    const file = `../data/${site.sitename}.json`;

    return fs.readFileSync(file, 'utf8');
}