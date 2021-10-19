import { MyInfoType } from "../Shared/type";
import { GET } from "../utils/axios";

// 로그인
export const getLogin = async (code: string) => {
  return (await GET("api/user/login", {
    code,
  })) as MyInfoType;
};
