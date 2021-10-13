import { PlaceDTO } from "src/place/dto/place.dto";

export class PinDTO {
    constructor(contents: string, place: PlaceDTO) {
        this.contents = contents;
        this.place = place;
    }

    contents: string;
    place: PlaceDTO;
}