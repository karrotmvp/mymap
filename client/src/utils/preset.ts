import { SetterOrUpdater } from "recoil";
import { getLogin } from "../api/user";
import { mini } from "../App";
import { UserType } from "../Shared/type";
import { Mixpanel } from "./mixpanel";

interface StartPresetProps {
  setViewerInfo: SetterOrUpdater<UserType>;
  regionId: string;
  afterFunc: () => void | Promise<void>;
}

export const funcNeedLogin = ({
  setViewerInfo,
  regionId,
  afterFunc,
}: StartPresetProps) => {
  if (!localStorage.getItem("token")) {
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

    mini.startPreset({
      preset: process.env.REACT_APP_LOGIN as string,
      params: {
        appId: process.env.REACT_APP_APP_ID as string,
      },
      async onSuccess(result) {
        if (result && result.code) {
          Mixpanel.track("로그인 - 새로운 유저");
          await getViewerInfo(result.code, regionId as string);
          afterFunc();
        }
      },
      onClose() {},
    });
  } else {
    afterFunc();
  }
};

export const handleClose = (installed: boolean) => {
  if (!installed) {
    mini.startPreset({
      preset: process.env.REACT_APP_INSTALL as string,
      params: {
        appId: process.env.REACT_APP_APP_ID as string,
      },
      onSuccess() {},
      onClose() {
        mini.close();
      },
    });
  } else {
    mini.close();
  }
};
