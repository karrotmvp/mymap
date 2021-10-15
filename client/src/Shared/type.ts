export interface PostType {
  postId: number;
  user: {
    userId: number;
    userName: string;
    profileImageUrl: string;
  };
  title: string;
  contents: string;
  regionId: string;
  share: boolean;
  pins: PinType[];
}

export interface PinType {
  pinId: number;
  review: string;
  place: PlaceType;
}

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

interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
  thumbnail: string;
}
