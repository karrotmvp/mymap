import { ApiProperty } from "@nestjs/swagger";
import { CoordinatesDTO } from "./coordinates.dto";

export class PlaceDTO {
    constructor(place: any) {
        this.placeId = place.id;
        this.name = place.name;
        this.phone = place.phone;
        this.address = place.address;
        this.coordinates = place.coordinates;
        this.businessHoursFrom = place.businessHoursFrom;
        this.businessHoursTo = place.businessHoursTo;
        this.businessHoursExtra = place.businessHoursExtra;
        this.category = place.category ? place.category.levels : null;
        this.thumbnail = place.thumbnail;
        this.images = place.images;
    }

    @ApiProperty({ example: "2264256" })
    placeId: string;
    @ApiProperty({ example: "좋은집밥" })
    name: string;
    @ApiProperty({ example: "021234567"})
    phone: string;
    @ApiProperty({ example: "서울특별시 강남구 논현로68길 8 (역삼동,지상1층)" })
    address: string;
    @ApiProperty({ example: "09:00" })
    businessHoursFrom: string;
    @ApiProperty({ example: "21:00" })
    businessHoursTo: string;
    @ApiProperty({ example: "금요일은 쉽니다." })
    businessHoursExtra: string;
    @ApiProperty()
    coordinates: CoordinatesDTO;
    @ApiProperty({ example: ["음식", "카페/디저트", "카페"] })
    category: string[];
    @ApiProperty({ example: {
        "id": "BP-1203981203981",
        "width": 640,
        "height": 320,
        "url": "http://image-server-domain/path-to-the-image",
        "thumbnail": "http://image-server-domain/path-to-the-thumbnail-image"
      }})
    thumbnail: object;
    @ApiProperty({ example: {
        "id": "BP-1203981203981",
        "width": 640,
        "height": 320,
        "url": "http://image-server-domain/path-to-the-image",
        "thumbnail": "http://image-server-domain/path-to-the-thumbnail-image"
      }})
    images: object;
    @ApiProperty({ example: 0 })
    saved: number;
}