import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    constructor(uniqueId: string, token: string) {
        this.uniqueId = uniqueId;
        this.token = token;
    }

    @PrimaryGeneratedColumn()
    private userId: number;

    @Column({ unique: true })
    private uniqueId: string;

    @Column()
    private token: string;

    @UpdateDateColumn()
    private updatedAt: Date;

    @CreateDateColumn()
    private createdAt: Date;

    @DeleteDateColumn()
    private deletedAt: Date;


    //Getter
    public getUserId(): number {
        return this.userId;
    }
    public getUniqueId(): string {
        return this.uniqueId;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getDeletedAt(): Date {
        return this.deletedAt;
    }
    
    //Setter
    public setToken(token: string): void {
        this.token = token;
    }
}