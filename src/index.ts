import {scrapyPosts} from './remote'
import sites from './selector';
import {writeFile, readFile} from './write';
import { Posts, Post, PostPayload } from './Post';
import * as fs from 'fs';
import levenshtein from 'fast-levenshtein'

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

async function write() {
    
    try {

        // await writeFile(1, 10, sites[0]); //dogdrip
        // console.log('site1 write End');

        // await writeFile(1, 10, sites[1]); //fmkorea
        // console.log('site2 write End');
        
    } catch (error) {
        
    }
}
let i = 0

async function compare(Posts1: Post[], Posts2: Post[]) {
    
    Posts1.map((post1: Post) => {
        Posts2.map((post2: Post) => {
            
            const title1 = post1.title
            const title2 = post2.title
            const distance = levenshtein.get(title1, title2);

            if(title1 !== '' && title1.length > 5 &&title2 !== '' && title2.length > 5&& distance < 5 ) {
                console.log(distance, title1, title2)
            }    
        })
    })

}
async function main() {

    const posts1 = await scrapyPosts(1, 21, sites[0]);
    const posts2 = await scrapyPosts(1, 21, sites[1]);
    await ( writeFile(posts1, sites[0]), writeFile(posts2, sites[1]) );
    
    compare( JSON.parse(await readFile(sites[0])), JSON.parse(await readFile(sites[1])) )
}

main()
