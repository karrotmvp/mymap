import { PlaceDTO } from "./place.dto";

export class RegionPlaceDTO {
    constructor(places: PlaceDTO[], paginator: string) {
        this.places = places;
        this.paginator = paginator;
    }

    places: PlaceDTO[];
    paginator: string;
}