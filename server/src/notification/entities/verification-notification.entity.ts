import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class VerificationNotification {
    @PrimaryGeneratedColumn()
    verificationNotificationId: number;

    @Column()
    type: string;

    @Column()
    id: number;

    @ManyToOne(() => User, user => user.verificationNotifications)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}