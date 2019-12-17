import { scrapyPosts } from './src/remote'
import sites from './src/selector';
import { writeFile, readFile } from './src/write';
import { Posts, Post, PostPayload } from './src/Post';
import * as fs from 'fs';
import levenshtein from 'fast-levenshtein'
import Storage from '@google-cloud/storage'
import { Datastore } from '@google-cloud/datastore';
const datastore = new Datastore({
    projectId: 'tribal-isotope-228803',
    keyFilename: 'tribal-isotope-228803-8d000bd04e4c.json'
});

async function compare(Posts1: Post[], Posts2: Post[]): Promise<Array<string>> {

    const result: Array<string> = [];

    Posts1.map((post1: Post) => {
        Posts2.map((post2: Post) => {

            const title1 = post1.title
            const title2 = post2.title
            const distance = levenshtein.get(title1, title2);

            const link = post1.link;
            if (title1 !== '' && title1.length > 5 && title2 !== '' && title2.length > 5 && distance < 5) {
                console.log(distance, title1, link)
                result.push(`<a href="${link}">${title1}</a>\n`)
            }
        })
    })
    console.log(result);
    return result;

}
export async function main() {
    const kindName = 'posts';
    const posts1 = await scrapyPosts(1, 20, sites[0]);
    const posts2 = await scrapyPosts(1, 20, sites[1]);
    await (writeFile(posts1, sites[0]), writeFile(posts2, sites[1]));

    let message = await compare(posts1, posts2)
    console.log('message is loaded')

    await datastore.save({
            key: datastore.key(kindName),
            data: {
                data: JSON.stringify(message) + '\n',
                createdAt: new Date(),
                excludeFromIndexes: true
            }
        }) 
    console.log('message is saved')

    return message;

    // return await compare( JSON.parse(await readFile(sites[0])), JSON.parse(await readFile(sites[1])) )
}
main();

setInterval(function() {
    main();
}, 1000 * 60 * 60 * 24);


exports.fuc = async (req: any, res: any) => {
    try {

        const posts1 = await scrapyPosts(1, 10, sites[0]);
        const posts2 = await scrapyPosts(1, 10, sites[1]);
        console.log('message is loading')

        let message = await compare(posts1, posts2)
        // await datastore.save({
        //     key: datastore.key(kindName),
        //     data: {
        //         data: JSON.stringify(message) + '\n',
        //         createdAt: new Date()
        //     }
        // })    

    } catch (error) {
        console.error('ERROR:', error);

    }
}