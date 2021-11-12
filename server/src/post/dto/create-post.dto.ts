import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreatePinDTO } from "./create-pin.dto";

export class CreatePostDTO {
    constructor() {}

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsOptional()
    contents: string;

    @ApiProperty()
    // @IsNotEmpty()
    regionId: string;
    
    @ApiProperty()
    @IsBoolean()
    share: boolean;

    @ApiProperty({
        type: [CreatePinDTO]
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(0)
    @ArrayMaxSize(10)
    @Type(() => CreatePinDTO)
    pins: CreatePinDTO[];
}