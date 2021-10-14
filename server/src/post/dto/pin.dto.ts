import { PlaceDTO } from "src/place/dto/place.dto";

export class PinDTO {
    constructor(review: string, place: PlaceDTO) {
        this.review = review;
        this.place = place;
    }

    review: string;
    place: PlaceDTO;
}