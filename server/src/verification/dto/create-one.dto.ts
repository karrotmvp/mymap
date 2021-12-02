import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOneDTO {
    @ApiProperty()
    @IsNotEmpty()
    regionId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    themeName: string;
}