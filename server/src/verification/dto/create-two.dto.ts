import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTwoDTO {
    @ApiProperty()
    @IsNotEmpty()
    regionId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    placeNames: string[];

    @ApiProperty()
    type: string;
}