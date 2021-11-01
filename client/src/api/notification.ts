import { POST } from "../utils/axios";

// 나중에 알림받기
export const postNotification = async () => {
  return await POST(
    "api/notification",
    {},
    {
      type: "poongsung",
    }
  );
};
