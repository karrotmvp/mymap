import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreatePinDTO } from "./create-pin.dto";

export class CreatePostDTO {
    constructor() {}

    @IsNotEmpty()
    readonly title: string;

    @IsOptional()
    readonly contents: string;

    @IsNotEmpty()
    readonly regionId: string;

    @IsBoolean()
    readonly share: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => CreatePinDTO)
    readonly pins: CreatePinDTO[];
}