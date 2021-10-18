import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { UpdatePostDTO } from "../dto/update-post.dto";
import { Pin } from "./pin.entity";

@Entity()
export class Post {
    constructor(user: User, title: string, contents: string , regionId: string, share: boolean, pins: Pin[]) {
        this.user = user;
        this.title = title;
        this.contents = contents;
        this.regionId = regionId;
        this.share = share;
        this.pins = pins;
    }

    @PrimaryGeneratedColumn()
    postId: number;

    @RelationId((post: Post) => post.user)
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ length: 30 })
    private title: string;

    @Column({ nullable: true })
    private contents: string;

    @Column()
    private regionId: string;

    @Column()
    private share: boolean;

    @OneToMany(() => Pin, pin => pin.post, { cascade:true })
    pins: Pin[];

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    public getPostId(): number {
        return this.postId;
    }
    public getTitle(): string {
        return this.title;
    }
    public getContents(): string {
        return this.contents
    }
    public getRegionId(): string {
        return this.regionId;
    }
    public getShare(): boolean {
        return this.share
    }
    public getUser(): User {
        return this.user;
    }
    public updatePost(post: UpdatePostDTO, pins: Pin[]) {
        this.title = post.title ? post.title : this.title;
        this.contents = post.contents ? post.contents : this.contents;
        this.share = post.share ? post.share : this.share;
        this.pins = pins;
    }
}
