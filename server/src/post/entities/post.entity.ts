import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Pin } from "./pin.entity";

@Entity()
export class Post {
    constructor(user: User, title: string, regionId: string, share: boolean, pins: Pin[]) {
        this.user = user;
        this.title = title;
        this.regionId = regionId;
        this.share = share;
        this.pins = pins;
    }

    @PrimaryGeneratedColumn()
    private postId: number;

    @RelationId((post: Post) => post.user)
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ length: 30 })
    private title: string;

    @Column()
    private regionId: string;

    @Column()
    private share: boolean;

    @OneToMany(() => Pin, pin => pin.post, { cascade: true })
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
    public getRegionId(): string {
        return this.regionId;
    }
    public getShare(): boolean {
        return this.share
    }
    public getUser(): User {
        return this.user;
    }
}
