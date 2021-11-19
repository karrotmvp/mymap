import { SetterOrUpdater } from "recoil";
import { getLogin } from "../api/user";
import { mini } from "../App";
import { UserType } from "../Shared/type";
import { Mixpanel } from "./mixpanel";

interface StartPresetProps {
  setViewerInfo: SetterOrUpdater<UserType>;
  regionId: string;
}

export const startPreset = ({ setViewerInfo, regionId }: StartPresetProps) => {
  const getViewerInfo = async (code: string, regionId: string) => {
    const data = await getLogin(code, regionId);
    setViewerInfo({
      userId: data.userId,
      userName: data.userName,
      regionName: data.regionName,
      profileImageUrl: data.profileImageUrl,
    });
    localStorage.setItem("token", data.token);
    Mixpanel.identify(data.userId.toString());
  };

  // if (code) {
  //   Mixpanel.track("로그인 - 기존 유저");
  //   getViewerInfo(code, regionId as string);
  // } else {
  mini.startPreset({
    preset: process.env.REACT_APP_LOGIN as string,
    params: {
      appId: process.env.REACT_APP_APP_ID as string,
    },
    onSuccess: function (result) {
      if (result && result.code) {
        Mixpanel.track("로그인 - 새로운 유저");
        getViewerInfo(result.code, regionId as string);
      }
    },
  });
  // }
};
