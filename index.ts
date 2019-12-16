import {scrapyPosts} from './src/remote'
import sites from './src/selector';
import {writeFile, readFile} from './src/write';
import { Posts, Post, PostPayload } from './src/Post';
import * as fs from 'fs';
import levenshtein from 'fast-levenshtein'

async function compare(Posts1: Post[], Posts2: Post[]): Promise<Array<string>> {
    
    const result: Array<string> = [];

    Posts1.map((post1: Post) => {
        Posts2.map((post2: Post) => {
            
            const title1 = post1.title
            const title2 = post2.title
            const distance = levenshtein.get(title1, title2);

            const link = post1.link;
            if(title1 !== '' && title1.length > 5 &&title2 !== '' && title2.length > 5 && distance < 10 ) {
                console.log(distance, title1, link)
                result.push(`<a href="${link}">${title1}</a>\n`)
            }    
        })
    })
    console.log(result);
    return result;

}
export async function main() {

    const posts1 = await scrapyPosts(1, 1, sites[0]);
    const posts2 = await scrapyPosts(1, 1, sites[1]);
    await ( writeFile(posts1, sites[0]), writeFile(posts2, sites[1]) );
    
    // return await compare( JSON.parse(await readFile(sites[0])), JSON.parse(await readFile(sites[1])) )
    return await compare( posts1, posts2 );
}
exports.fuc = async (req: any, res: any) => {

    const posts1 = await scrapyPosts(1, 1, sites[0]);
    const posts2 = await scrapyPosts(1, 1, sites[1]);
    console.log('message is loading')
    // const posts1 = JSON.parse(await readFile(sites[0]))
    // const posts2 = JSON.parse(await readFile(sites[1]))
    
    let message = await compare( posts1, posts2 )
    console.log('message is loaded')
    res.status(200).send(message);
}