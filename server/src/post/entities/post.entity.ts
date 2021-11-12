import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { UpdatePostDTO } from "../dto/update-post.dto";
import { Pin } from "./pin.entity";
import { SavedPost } from "./savedPost.entity";

@Entity()
export class Post {
    constructor(user: User, title: string, contents: string , regionId: string, regionName: string, share: boolean, pins: Pin[]) {
        this.user = user;
        this.title = title;
        this.contents = contents;
        this.regionId = regionId;
        this.regionName = regionName;
        this.share = share;
        this.pins = pins;
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    postId: number;

    @ApiProperty()
    @RelationId((post: Post) => post.user)
    userId: number;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    user: User;

    @ApiProperty()
    @Column({ length: 30 })
    private title: string;

    @ApiProperty()
    @Column({ nullable: true })
    private contents: string;

    @ApiProperty()
    @Column({ nullable: true })
    private regionId: string;

    @ApiProperty()
    @Column({ nullable: true })
    private regionName: string;

    @ApiProperty()
    @Column()
    private share: boolean;

    @ApiProperty({ type: () => [Pin] })
    @OneToMany(() => Pin, pin => pin.post, { cascade:true })
    pins: Pin[];

    @OneToMany(() => SavedPost, savedPost => savedPost.post, { cascade: true })
    savedPosts: SavedPost[];

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
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
    public getRegionName(): string {
        return this.regionName;
    }
    public getShare(): boolean {
        return this.share
    }
    public getUser(): User {
        return this.user;
    }
    public updatePost(post: UpdatePostDTO, pins: Pin[], regionName?: string) {
        this.title = post.title ? post.title : this.title;
        this.contents = post.contents ? post.contents : this.contents;
        this.regionId = post.regionId ? post.regionId : this.regionId;
        this.regionName = regionName ? regionName : this.regionName;
        this.share = post.share;
        this.pins = pins;
    }
    public updateShare() {
        this.share = !this.share;
    }
    public pushPin(pin: Pin[]) {
        this.pins.push(...pin);
    }
}
