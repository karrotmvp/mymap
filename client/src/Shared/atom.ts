import { atom, atomFamily, selectorFamily } from "recoil";
import { getLogin } from "../api/user";
import { PostType, UserType } from "./type";

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

export const PostIsSaved = atomFamily({
  key: "PostIsSaved",
  default: false,
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

export const PostToEdit = atom<PostType | null>({
  key: "PostToEdit",
  default: null,
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
