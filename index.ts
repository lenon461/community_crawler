import { scrapyPosts } from './src/remote'
import { writeFile, readFile } from './src/write';
import { Posts, Post, PostPayload } from './src/Post';
import { yyyymmdd } from './src/util';
import sites from './src/selector';
import * as fs from 'fs';
import levenshtein from 'fast-levenshtein'
import { sequelize } from './models';

import * as PostModel from './models/post.model';
import * as UserModel from './models/user.model';
import { log, time, timeEnd } from 'console';

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
                result.push(`${title1} : ${link}`)
            }
        })
    })
    console.log(result);
    return result;

}
export async function main() {

    await sequelize.sync();

    log("MAIN START");

    time("Link")
    const user = await PostModel.Post.findOne({where : {link : '/best/2438829540'}});
    console.log(user  && user.get())
    timeEnd("Link");

    time("titles")
    const titles = await PostModel.Post.findAll({where : {title :'데일리메일 클롭 기존 시니어 필드 선수 명으로 에버튼과 싸운다 '}});
    // console.log(titles.map(post => post.get()))
    timeEnd("titles");

    time("title")
    const title = await PostModel.Post.findOne({where : {title : '데일리메일 클롭 기존 시니어 필드 선수 명으로 에버튼과 싸운다 '}});
    console.log((title && title.get()))
    timeEnd("title");

    time("Post")
    const post = await PostModel.Post.findOne({where : {id : 210003}});
    console.log(post  && post.get())
    timeEnd("Post");

    time("posts")
    const posts = await PostModel.Post.findAll();
    console.log(posts.map(post => post.get()).length)
    timeEnd("posts");
}
export async function write() {
    for (let i = 1; i < 990; i++) {
        const posts2 = await scrapyPosts(i, i + 10, sites[1]);

        posts2.map(post => {
            PostModel.Post.create(post)
                .then((post: any) => log(post))
                .catch((error: any) => log(error))
        })
    }

    // PostModel.Post.findAll()
    //     .then((posts: any) => log(posts))
    //     .catch((error: any) => log(error))
}
main();
