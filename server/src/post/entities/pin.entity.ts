import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pin {
    constructor(review: string, placeId: string) {
        this.review = review;
        this.placeId = placeId;
    }

    @PrimaryGeneratedColumn()
    private pinId: number;

    @ManyToOne(() => Post, post => post.pins)
    @JoinColumn()
    post: Post;

    @Column()
    private review: string;
    
    @Column()
    private placeId: string;

    @UpdateDateColumn()
    private updatedAt: Date;

    @CreateDateColumn()
    private createdAt: Date;

    public getPinId(): number {
        return this.pinId;
    }
    public getReview(): string {
        return this.review;
    }
    public getPlaceId(): string {
        return this.placeId;
    }
}