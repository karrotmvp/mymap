import { MyInfoType } from "../Shared/type";
import { GET } from "../utils/axios";

// 로그인
interface LoginBody extends MyInfoType {
  token: string;
}
export const getLogin = async (code: string, regionId: string) => {
  return (await GET("api/user/login", {
    code,
    regionId,
  })) as LoginBody;
};