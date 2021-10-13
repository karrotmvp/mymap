import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class SavedPost {
    constructor(post: Post, user: User) {
        this.post = post;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    private savedPostId: number;

    @RelationId((savedPost: SavedPost) => savedPost.post)
    postId: number;

    @ManyToOne(() => Post)
    @JoinColumn()
    post: Post;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    public getPostId(): number {
        return this.postId;
    }
}