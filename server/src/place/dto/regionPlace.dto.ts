import { PlaceDTO } from "./place.dto";

export class RegionPlaceDTO {
    constructor(places: PlaceDTO[], seed: string) {
        this.places = places;
        this.seed = seed;
    }

    places: PlaceDTO[];
    seed: string;
}