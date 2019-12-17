import { scrapyPosts } from './remote'
import { selector } from './selector';
import { Posts, Post, PostPayload } from './Post';
import * as fs from 'fs';
import * as path from 'path'

export async function writeFile(posts: Post[], site: selector): Promise<void>{
    
    const dataPath = path.join(__dirname, '../data');

    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
        console.log('data dir is not exist.');
    }
    console.log("data dir is created")

    const filePath = path.join(__dirname, '../data', `${site.sitename}.json`);

    await fs.openSync(filePath, 'a+');
    // const fd = await fs.writeFileSync(filePath, ' ')
    // const obj = posts.map(post => {
    //     return {'payload': post}
    // })
    await fs.appendFileSync(filePath, JSON.stringify(posts)+ '\n');
    console.log("file is writed")

    return ;
}


export async function readFile(site: selector): Promise<string>{
    
    const filePath = path.join(__dirname, '../data', `${site.sitename}.json`);

    return fs.readFileSync(filePath, 'utf8');
}

