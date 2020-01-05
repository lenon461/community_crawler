import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

import {Post} from './post.model';
import {User} from './user.model';
export const sequelize = new Sequelize({

    database: config.database,
    dialect: config.dialect,
    username: config.username,
    password: config.password,
    storage: ':memory:',
    models: [Post, User]
});

