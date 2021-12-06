import { ApiProperty } from "@nestjs/swagger";
import { CoordinatesDTO } from "src/place/dto/coordinates.dto";
import { PinDTO } from "./pin.dto";

export class RegionPinsDTO {
    constructor(detailPins: PinDTO[], coordinates: CoordinatesDTO) {
        this.pins = detailPins;
        this.coordinates = coordinates
    }

    @ApiProperty()
    coordinates: CoordinatesDTO
    @ApiProperty({ type: [PinDTO] })
    pins: PinDTO[];
}