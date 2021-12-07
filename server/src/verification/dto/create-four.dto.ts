import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateFourDTO {
    @ApiProperty()
    @IsNotEmpty()
    regionId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    placeNames: string[];
}