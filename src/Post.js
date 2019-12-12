"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let id = 0;
class Post {
    constructor(payload) {
        const { title, author, up, updated } = payload;
        this.id = id++;
        this.title = title.replace(/[^ ㄱ-ㅣ가-힣]+/g, '').replace('[/[/g]', '');
        this.author = author;
        this.up = parseInt(up, 10);
        this.created = new Date();
        this.updated = updated;
    }
}
exports.Post = Post;
class Posts {
    constructor(payload) {
        const data = payload;
        this.id = id++;
        this.data = payload;
    }
}
exports.Posts = Posts;
