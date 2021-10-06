import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private _id: number;

    @Column()
    private uniqueId: number;

    @Column()
    private userName: string;

    @Column()
    private profileImgURL: string;

    @UpdateDateColumn()
    private updated_at: Date;

    @CreateDateColumn()
    private created_at: Date;

    public getId
}