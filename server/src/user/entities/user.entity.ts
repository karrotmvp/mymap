import { ApiProperty } from "@nestjs/swagger";
import { SavedPlace } from "src/place/entities/savedPlace.entity";
import { Post } from "src/post/entities/post.entity";
import { SavedPost } from "src/post/entities/savedPost.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    constructor(uniqueId: string, token: string) {
        this.uniqueId = uniqueId;
        this.token = token;
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    private userId: number;

    @OneToMany(() => SavedPlace, savedPlace => savedPlace.user, { cascade: true })
    savedPlaces: SavedPlace[];

    @OneToMany(() => SavedPost, savedPost => savedPost.user, { cascade: true })
    savedPosts: SavedPost[];

    @OneToMany(() => Post, post => post.user, { cascade: true })
    posts: Post[];

    @ApiProperty()
    @Column({ unique: true })
    private uniqueId: string;

    @ApiProperty()
    @Column()
    private token: string;

    @ApiProperty()
    @Column({ default: false })
    private isAdmin: boolean;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;


    //Getter
    public getUserId(): number {
        return this.userId;
    }
    public getUniqueId(): string {
        return this.uniqueId;
    }
    public getIsAdmin(): boolean {
        return this.isAdmin;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getDeletedAt(): Date {
        return this.deletedAt;
    }
    
    //Setter
    public setToken(token: string): void {
        this.token = token;
    }
}