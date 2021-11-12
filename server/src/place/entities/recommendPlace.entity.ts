import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RecommendPlace {
    constructor(placeId: string, regionId: string) {
        this.placeId = placeId;
        this.regionId = regionId;
    }

    @PrimaryGeneratedColumn()
    private recommendPlaceId: number;

    @Column()
    private placeId: string;

    @Column()
    private regionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    public getPlaceId(): string {
        return this.placeId;
    }
}