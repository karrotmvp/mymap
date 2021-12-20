export interface PostType {
  postId: number;
  user: UserType;
  title: string;
  contents: string;
  regionId: string;
  regionName: string;
  savedNum: number;
  share: boolean;
  pins: PinType[];
  createdAt: string;
  saved: boolean;
}

export interface FeedType {
  posts: PostType[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface UserType {
  userId: number;
  userName: string;
  regionName: string;
  profileImageUrl?: string;
}

export interface PinType {
  pinId: number;
  review: string;
  place: PlaceType;
  placeId?: string;
}

export interface PlaceType {
  placeId: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  businessHoursFrom: string | null;
  businessHoursTo: string | null;
  businessHoursExtra: string | null;
  phone: string | null;
  category: string[];
  thumbnail: ImageType | null;
  images: ImageType[];
  savedNum: number;
  isSaved: boolean;
}
export interface PlaceDetailType extends PlaceType {
  posts: FeedType;
}

export interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
  thumbnail: string;
}
