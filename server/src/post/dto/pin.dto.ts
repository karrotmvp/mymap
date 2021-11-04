import { ApiProperty } from "@nestjs/swagger";
import { PlaceDTO } from "src/place/dto/place.dto";
import { Pin } from "../entities/pin.entity";

export class PinDTO {
    constructor(pin: Pin, place: PlaceDTO) {
        this.pinId = pin.getPinId();
        this.review = pin.getReview();
        this.place = place;
    }

    @ApiProperty({ example: 1})
    pinId: number
    @ApiProperty({ example: "장소 한 줄평 "})
    review: string;
    @ApiProperty()
    place: PlaceDTO;
}