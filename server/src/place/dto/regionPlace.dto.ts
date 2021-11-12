import { ApiProperty } from "@nestjs/swagger";
import { CoordinatesDTO } from "./coordinates.dto";
import { PlaceDTO } from "./place.dto";

export class RegionPlaceDTO {
    constructor(places: PlaceDTO[], seed: string, coordinates: CoordinatesDTO) {
        this.places = places;
        this.seed = seed;
        this.coordinates = coordinates;
    }

    @ApiProperty({ type: [PlaceDTO] })
    places: PlaceDTO[];
    
    @ApiProperty()
    seed: string;

    @ApiProperty()
    coordinates: CoordinatesDTO;
}