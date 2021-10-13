import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pin {
    constructor(contents: string, placeId: string) {
        this.contents = contents;
        this.placeId = placeId;
    }

    @PrimaryGeneratedColumn()
    private pinId: number;

    @ManyToOne(() => Post, post => post.pins)
    @JoinColumn()
    post: Post;

    @Column()
    private contents: string;
    
    @Column()
    private placeId: string;

    @UpdateDateColumn()
    private updatedAt: Date;

    @CreateDateColumn()
    private createdAt: Date;

    public getPinId(): number {
        return this.pinId;
    }
    public getContents(): string {
        return this.contents;
    }
    public getPlaceId(): string {
        return this.placeId;
    }
}