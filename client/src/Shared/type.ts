export interface PostType {
  postId: string;
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
  userId: string;
  userName: string;
  regionName: string;
  profileImageUrl?: string;
}

export interface PinType {
  pinId: string;
  review: string;
  place: PlaceType;
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
  category: string[];
  thumbnail: ImageType | null;
  images: ImageType[];
  saved: number;
}

interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
  thumbnail: string;
}
