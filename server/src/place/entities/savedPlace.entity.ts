import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SavedPlace {
    constructor(user: User, placeId: string) {
        this.placeId = placeId;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    private savedPlaceId: number;

    @Column()
    private placeId: string;

    @ManyToOne(() => User, user => user.savedPlaces)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    public getPlaceId(): string {
        return this.placeId
    }
}