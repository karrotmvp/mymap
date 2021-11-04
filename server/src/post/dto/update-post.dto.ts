import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, ValidateNested } from "class-validator";
import { Pin } from "../entities/pin.entity";
import { CreatePinDTO } from "./create-pin.dto";

export class UpdatePostDTO {
    constructor() {}

    @ApiProperty({
    })
    @IsOptional()
    readonly title?: string;
    
    @ApiProperty({
    })
    @IsOptional()
    readonly contents?: string;

    @ApiProperty({
    })
    @IsOptional()
    readonly regionId?: string;

    @ApiProperty({
    })
    @IsOptional()
    readonly share?: boolean;

    @ApiProperty({
        type: [CreatePinDTO]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => CreatePinDTO)
    readonly pins: CreatePinDTO[];
}