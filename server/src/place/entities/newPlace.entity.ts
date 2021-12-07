import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class NewPlace {
    constructor() {}

    @PrimaryGeneratedColumn()
    newPlaceId: number;

    @Column()
    regionName: string;

    @Column()
    regionId: string;

    @Column()
    placeName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}