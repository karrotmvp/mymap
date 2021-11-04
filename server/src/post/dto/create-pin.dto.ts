import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePinDTO {
    constructor() {}

    @ApiProperty()
    @IsOptional()
    readonly review: string;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly placeId: string;
}
