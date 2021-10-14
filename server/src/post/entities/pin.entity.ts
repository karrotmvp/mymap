import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ nullable: true })
    private review: string;
    
    @Column()
    private placeId: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

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