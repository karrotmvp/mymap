import { atom } from "recoil";
import { MyInfoType, PlaceType } from "./type";

export const Places = atom<PlaceType[]>({
  key: "places",
  default: [],
});

export const RegionId = atom({
  key: "region_id",
  default: "",
});

export const MyInfo = atom<MyInfoType | {}>({
  key: "my_info",
  default: {},
});
