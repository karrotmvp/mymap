import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, ValidateNested } from "class-validator";
import { CreatePinDTO } from "./create-pin.dto";

export class UpdatePostDTO {
    constructor() {}

    @IsOptional()
    readonly title?: string;
    
    @IsOptional()
    readonly contents?: string;

    @IsOptional()
    readonly regionId?: string;

    @IsOptional()
    readonly share?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => CreatePinDTO)
    readonly pins: CreatePinDTO[];
}