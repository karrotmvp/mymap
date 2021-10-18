import { PlaceDTO } from "src/place/dto/place.dto";
import { Pin } from "../entities/pin.entity";

export class PinDTO {
    constructor(pin: Pin, place: PlaceDTO) {
        this.pinId = pin.getPinId();
        this.review = pin.getReview();
        this.place = place;
    }

    pinId: number
    review: string;
    place: PlaceDTO;
}