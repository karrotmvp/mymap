import { MyInfoType } from "../Shared/type";
import { POST } from "../utils/axios";

// 로그인
export const postLogin = async (code: string) => {
  return (await POST("api/user/login", {
    code,
  })) as MyInfoType;
};
