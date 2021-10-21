import { atom, atomFamily, selectorFamily } from "recoil";
import { getPost } from "../api/post";
import { MyInfoType, PlaceType, PostType } from "./type";

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

export const postDetailAtom = atomFamily({
  key: "postDetailAtom",
  default: selectorFamily<PostType, number>({
    key: "postDetailAtom/selector",
    get: (id) => () => getPost(id),
  }),
});
