import { threadId } from "worker_threads";

export interface PostPayload {
    title: string;
    author: string;
    up: string;
    uploaded: string;
    link?: string;
}

let id = 0;

export class Post {
    id: number;
    title: string;
    author: string;
    up: number;
    created: Date;
    uploaded: string;
    link?: string;

    constructor(payload: PostPayload) {
        const {title, author, up, uploaded,link} = payload;

        this.id = id++;
        this.title = title.replace(/[^ ㄱ-ㅣ가-힣]+/g, '').replace('[/[/g]','');
        this.author = author;
        this.up = parseInt(up, 10);
        this.created = new Date();
        this.uploaded = uploaded;
        this.link = link;
    }
}

export class Posts {
    id: number;
    data: Post;

    constructor(payload: Post) {
        const data = payload;

        this.id = id++;
        this.data = payload;
    }
}