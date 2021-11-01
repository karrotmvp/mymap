import { UserType } from "../Shared/type";
import { GET, POST } from "../utils/axios";

// 로그인
interface LoginBody extends UserType {
  token: string;
}
export const getLogin = async (code: string, regionId: string) => {
  return (await GET("api/user/login", {
    code,
    regionId,
  })) as LoginBody;
};

// 오픈하면 알림받기
export const postPreopen = async (regionId: string) => {
  return await POST(
    "api/user/preopen",
    {},
    {
      regionId,
    }
  );
};
