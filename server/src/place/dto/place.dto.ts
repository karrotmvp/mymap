export class PlaceDTO {
    constructor(place: any) {
        this.placeId = place.id;
        this.name = place.name;
        this.address = place.address;
        this.coordinate = place.coordinates;
        this.businessHoursFrom = place.businessHoursFrom;
        this.businessHoursTo = place.businessHoursTo;
        this.businessHoursExtra = place.businessHoursExtra;
        this.category = place.category ? place.category.levels : null;
        this.thumbnail = place.thumbnail;
        this.images = place.images;
    }

    placeId: string;
    name: string;
    address: string;
    businessHoursFrom: string;
    businessHoursTo: string;
    businessHoursExtra: string;
    coordinate: object;
    category: string[];
    thumbnail: object;
    images: object;
}