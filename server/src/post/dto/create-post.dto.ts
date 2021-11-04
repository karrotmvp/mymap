import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreatePinDTO } from "./create-pin.dto";

export class CreatePostDTO {
    constructor() {}

    @ApiProperty()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsOptional()
    readonly contents: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly regionId: string;
    
    @ApiProperty()
    @IsBoolean()
    readonly share: boolean;

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