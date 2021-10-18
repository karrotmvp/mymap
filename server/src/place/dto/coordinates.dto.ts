export class CoordinatesDTO {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
    }
    
    latitude: number;
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