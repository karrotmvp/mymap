import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class PreopenUser {
    constructor(user: User, regionId: string) {
        this.user = user;
        this.regionId = regionId;
    }

    @PrimaryGeneratedColumn()
    private preopenUserId: number;

    @ManyToOne(() => User)
    @JoinColumn()
    private user: User;

    @Column()
    private regionId: string;

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    sendedAt: Date

    public getPreopenUserId(): number {
        return this.preopenUserId;
    }
    public getUser(): User {
        return this.user;
    }
    public getRegionId(): string {
        return this.regionId;
    }
}