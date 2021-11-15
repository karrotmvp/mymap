import { atom, atomFamily, selectorFamily } from "recoil";
import { getSearch } from "../api/place";
import { getPost } from "../api/post";
import { getLogin } from "../api/user";
import { UserType, PlaceType, PostType } from "./type";

export const RegionId = atom({
  key: "region_id",
  default: "",
});

export const ViewerInfo = atom<UserType>({
  key: "my_info",
  default: {
    userId: 0,
    userName: "",
    regionName: "",
    profileImageUrl: "",
  },
});

export const DetailId = atom<number | null>({
  key: "DetailId",
  default: null,
});

export const PlaceToSave = atom({
  key: "IsSaveModalOpened",
  default: {
    isModalOpened: false,
    placeId: "",
  },
});

export const PageBeforeWrite = atom({
  key: "page_before_write",
  default: "/",
});

export const ToastMessage = atom({
  key: "ToastMessage",
  default: {
    isToastShown: false,
    message: "",
  },
});

export const viewerInfoAtom = atomFamily({
  key: "my_info",
  default: selectorFamily<UserType, { code: string; regionId: string }>({
    key: "searchAtom/selector",
    get:
      ({ code, regionId }) =>
      () =>
        getLogin(code, regionId),
  }),
});

export const postDetailAtom = atomFamily({
  key: "postDetailAtom",
  default: selectorFamily<PostType, number>({
    key: "postDetailAtom/selector",
    get: (id) => () => getPost(id),
  }),
});

export const searchAtom = atomFamily({
  key: "searchAtom",
  default: selectorFamily<PlaceType[], { regionId: string; val: string }>({
    key: "searchAtom/selector",
    get:
      ({ regionId, val }) =>
      () =>
        getSearch(regionId, { query: val }),
  }),
});
