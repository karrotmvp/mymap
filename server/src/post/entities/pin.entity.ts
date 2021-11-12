import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pin {
    constructor(review: string, placeId: string) {
        this.review = review;
        this.placeId = placeId;
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    private pinId: number;

    @ManyToOne(() => Post, post => post.pins)
    @JoinColumn()
    post: Post;

    @ApiProperty()
    @Column({ nullable: true })
    private review: string;
    
    @ApiProperty()
    @Column()
    private placeId: string;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
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