import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Four {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    FourId: number;
    
    @ApiProperty()
    @Column()
    regionId: string;

    @ApiProperty()
    @Column()
    regionName: string;

    @ApiProperty()
    @Column()
    placeNames: string;

    @ApiProperty()
    @Column()
    placeNum: number;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;
}