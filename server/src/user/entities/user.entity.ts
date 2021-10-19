import { SavedPost } from "src/post/entities/savedPost.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    constructor(uniqueId: string, token: string) {
        this.uniqueId = uniqueId;
        this.token = token;
    }

    @PrimaryGeneratedColumn()
    private userId: number;

    // @OneToMany(() => SavedPost, savedPost => savedPost.user, { cascade: true })
    // savedPosts: SavedPost[];

    @Column({ unique: true })
    private uniqueId: string;

    @Column()
    private token: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


    //Getter
    public getUserId(): number {
        return this.userId;
    }
    public getUniqueId(): string {
        return this.uniqueId;
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