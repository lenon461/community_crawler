import {scrapyPosts} from './remote'
import sites from './selector';
import {writeFile, readFile} from './write';
import { Posts, Post, PostPayload } from './Post';
import * as fs from 'fs';
import levenshtein from 'fast-levenshtein'

async function write() {
    
    try {
        
        await writeFile(1, 100, sites[0]); //dogdrip
        console.log('site1 write End');

        await writeFile(1, 100, sites[1]); //fmkorea
        console.log('site2 write End');
        
    } catch (error) {
        
    }
}
let i = 0

async function compare() {
    const data1 = JSON.parse(await readFile(sites[0]));
    const data2 = JSON.parse(await readFile(sites[1]));
    
    data1.map((ele1: {payload: PostPayload}) => {
        data2.map((ele2: {payload: PostPayload}) => {
            const title1 = ele1.payload.title
            const title2 = ele2.payload.title
            const distance = levenshtein.get(title1, title2);
            if(distance < 3) {
                console.log(distance, title1, title2)
            }    
        })
    })

}
async function main() {

    await write();
    compare();
}
main()
// var distance = levenshtein.get('흠가나다라마바사', '가나다아자카타파')
// console.log(distance)
// var distance = levenshtein.get('우리가 저렇게', '우리가 저렇게')
// console.log(distance)
// var distance = levenshtein.get('우리가 저렇게a', 'bwbafaf@@s')
// console.log(distance)
