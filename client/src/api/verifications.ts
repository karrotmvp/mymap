import { POST } from "../utils/axios";

// 온보딩1
export const postVerification1 = async (
  regionId: string,
  themeName: string
) => {
  return (await POST("api/verifications/one", {
    regionId,
    themeName,
  })) as {
    OneId: number;
  };
};

// 온보딩2
export const postVerification2 = async (
  regionId: string,
  placeNames: string
) => {
  return (await POST("api/verifications/two", { regionId, placeNames })) as {
    TwoId: number;
  };
};
