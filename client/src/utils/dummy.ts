import { PinType, PlaceType, PostType } from "../Shared/type";

export const dummyPins: PinType[] = [
  {
    pinId: 0,
    review: "장소 소개",
    place: {
      placeId: "0",
      name: "삼성영어청룡어학원",
      address: "충청남도 천안시 동남구 풍세로 769-28",
      coordinate: {
        latitude: 36.78,
        longitude: 127.139,
      },
      businessHoursFrom: "09:00",
      businessHoursTo: "21:00",
      businessHoursExtra: "금요일은 쉽니다.",
      category: ["음식", "카페/디저트", "카페"],
      thumbnail: {
        id: "BP-1203981203981",
        width: 640,
        height: 320,
        url: "http://image-server-domain/path-to-the-image",
        thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
      },
      images: [
        {
          id: "BP-1203981203981",
          width: 640,
          height: 320,
          url: "http://image-server-domain/path-to-the-image",
          thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
        },
      ],
    },
  },
  {
    pinId: 1,
    review: "장소 소개",
    place: {
      placeId: "1",
      name: "삼성영어청룡어학원",
      address: "충청남도 천안시 동남구 풍세로 769-28",
      coordinate: {
        latitude: 36.7796945602981,
        longitude: 127.13872042726,
      },
      businessHoursFrom: "09:00",
      businessHoursTo: "21:00",
      businessHoursExtra: "금요일은 쉽니다.",
      category: ["음식", "카페/디저트", "카페"],
      thumbnail: {
        id: "BP-1203981203981",
        width: 640,
        height: 320,
        url: "http://image-server-domain/path-to-the-image",
        thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
      },
      images: [
        {
          id: "BP-1203981203981",
          width: 640,
          height: 320,
          url: "http://image-server-domain/path-to-the-image",
          thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
        },
      ],
    },
  },
];

export const dummyPosts: PostType[] = [
  {
    postId: 123,
    user: {
      userId: 123,
      userName: "당근이",
      profileImageUrl: "",
    },
    title: "새 컬렉션",
    contents: "설명",
    regionId: "6530459d189b",
    share: true,
    pins: dummyPins,
  },
];

export const dummyPlaces: PlaceType[] = [
  {
    placeId: "0",
    name: "삼성영어청룡어학원",
    address: "충청남도 천안시 동남구 풍세로 769-28",
    coordinate: {
      latitude: 36.78,
      longitude: 127.139,
    },
    businessHoursFrom: "09:00",
    businessHoursTo: "21:00",
    businessHoursExtra: "금요일은 쉽니다.",
    category: ["음식", "카페/디저트", "카페"],
    thumbnail: {
      id: "BP-1203981203981",
      width: 640,
      height: 320,
      url: "http://image-server-domain/path-to-the-image",
      thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
    },
    images: [
      {
        id: "BP-1203981203981",
        width: 640,
        height: 320,
        url: "http://image-server-domain/path-to-the-image",
        thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
      },
    ],
  },
  {
    placeId: "1",
    name: "삼성영어청룡어학원",
    address: "충청남도 천안시 동남구 풍세로 769-28",
    coordinate: {
      latitude: 36.779694560298,
      longitude: 127.1387204272,
    },
    businessHoursFrom: "09:00",
    businessHoursTo: "21:00",
    businessHoursExtra: "금요일은 쉽니다.",
    category: ["음식", "카페/디저트", "카페"],
    thumbnail: {
      id: "BP-1203981203981",
      width: 640,
      height: 320,
      url: "http://image-server-domain/path-to-the-image",
      thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
    },
    images: [
      {
        id: "BP-1203981203981",
        width: 640,
        height: 320,
        url: "http://image-server-domain/path-to-the-image",
        thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
      },
    ],
  },
];
