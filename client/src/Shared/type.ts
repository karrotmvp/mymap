export interface PlaceType {
  placeId: string;
  name: string;
  address: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  businessHoursFrom: string | null;
  businessHoursTo: string | null;
  businessHoursExtra: string | null;
  category: string[] | null;
  thumbnail: ImageType | null;
  images: ImageType[];
}

export interface PostPlaceType {
  title: string;
  regionId: string;
  share: boolean;
  pins: Pin[];
}

interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
  thumbnail: string;
}

interface Pin {
  placeId: string;
  contents?: string;
}
