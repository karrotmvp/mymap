import { POST } from "../utils/axios";

// 오픈하면 알림받기
export const postNotification = async () => {
  return await POST(
    "api/notification",
    {},
    {
      type: "poongsung",
    }
  );
};
