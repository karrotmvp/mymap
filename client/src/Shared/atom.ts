import { atom } from "recoil";
import { MyInfoType, PlaceType } from "./type";

export const Places = atom<PlaceType[]>({
  key: "places",
  default: [],
});

export const RegionId = atom({
  key: "region_id",
  default: "6530459d189b",
});

export const MyInfo = atom<MyInfoType>({
  key: "my_info",
  default: {
    userId: 1,
    userName: "team1test",
  },
});
