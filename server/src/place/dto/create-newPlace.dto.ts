import { ApiProperty } from "@nestjs/swagger";

export class CreateNewPlaceDTO {

    @ApiProperty()
    placeName: string;
}