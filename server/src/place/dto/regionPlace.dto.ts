import { ApiProperty } from "@nestjs/swagger";
import { PlaceDTO } from "./place.dto";

export class RegionPlaceDTO {
    constructor(places: PlaceDTO[], seed: string) {
        this.places = places;
        this.seed = seed;
    }

    @ApiProperty({ type: [PlaceDTO] })
    places: PlaceDTO[];
    
    @ApiProperty()
    seed: string;
}