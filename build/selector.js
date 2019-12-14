"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sites = [
    {
        sitename: 'DOGDRIP',
        url: 'https://www.dogdrip.net/index.php?mid=dogdrip&page=',
        selector: {
            list: 'main > div > div.eq.section.secontent.background-color-content > div > div.ed.board-list > table > tbody',
            children: 'tr',
            title: 'tr > td.title > a > span.ed.title-link',
            author: 'tr > td.author > a',
            up: 'tr > td.ed.voteNum.text-primary',
            updated: 'tr > td.time'
        },
    },
    {
        sitename: 'FMKOREA',
        url: 'https://www.fmkorea.com/index.php?mid=best&page=',
        selector: {
            list: '#bd_189545458_0 > div > div.fm_best_widget._bd_pc > ul',
            children: 'li',
            title: 'li > div > h3 > a',
            author: 'li > div > div > span.author',
            up: 'li > div > a.pc_voted_count.pc_voted_count_plus.pc_voted_count_short > span.count',
            updated: 'li > div > div > span.regdate'
        },
    }
];
exports.default = sites;
