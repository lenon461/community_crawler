import {Table, Column, Model, HasMany, Index} from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {
    
    @Index
    @Column
    title!: string;
    
    @Column
    author!: string;
    
    @Column
    up!: number;
    
    @Column
    link!: string;

    @Column
    uploaded!: string;

    
}
