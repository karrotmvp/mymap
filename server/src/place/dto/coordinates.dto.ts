import { ApiProperty } from "@nestjs/swagger";

export class CoordinatesDTO {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
    }
    
    @ApiProperty({ example: 37.4945531889819 })
    latitude: number;
    @ApiProperty({ example: 127.040719383755 })
    longitude: number;

    public sumCoordinates(coordinates: CoordinatesDTO) {
        this.latitude += coordinates.latitude;
        this.longitude += coordinates.longitude;
    }
    public avgCoordinates(num: number) {
        this.latitude /= num;
        this.longitude /= num;
    }
}