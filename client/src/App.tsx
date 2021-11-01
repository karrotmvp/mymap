/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Around from "./Pages/Around/Around";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail";
import Write from "./Pages/Write/Write";
import Mini from "@karrotmarket/mini";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ViewerInfo, RegionId } from "./Shared/atom";
import { useCallback, useEffect } from "react";
import { getLogin } from "./api/user";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ClosePage from "./Pages/ClosePage";
import Onboarding from "./Pages/Onboarding";
import Analytics from "react-router-ga";
import { Mixpanel } from "./utils/mixpanel";

dayjs.locale("ko");

const mini = new Mini();

const preload = new URLSearchParams(window.location.search).get("preload");
const regionId = new URLSearchParams(window.location.search).get("region_id");
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const setRegionId = useSetRecoilState(RegionId);

  // 로그인 및 내 정보 저장
  const [viewerInfo, setViewerInfo] = useRecoilState(ViewerInfo);
  const getMyInfo = useCallback(async (code: string, regionId: string) => {
    const data = await getLogin(code, regionId);
    setViewerInfo({
      userId: data.userId,
      userName: data.userName,
      regionName: data.regionName,
    });
    localStorage.setItem("token", data.token);
    Mixpanel.identify(data.userId.toString());
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setViewerInfo({
        userId: "1",
        userName: "team1test",
        regionName: "역삼 1동",
      });
    } else if (!preload) {
      setRegionId(regionId as string);
      if (code) getMyInfo(code, regionId as string);
      else {
        mini.startPreset({
          preset:
            process.env.NODE_ENV === "production"
              ? (process.env.REACT_APP_LOGIN as string)
              : "https://mini-assets.kr.karrotmarket.com/presets/common-login/alpha.html",
          params: {
            appId: process.env.REACT_APP_APP_ID as string,
          },
          onSuccess: function (result) {
            if (result && result.code) {
              getMyInfo(result.code, regionId as string);
            }
          },
        });
      }
    }
  }, []);

  return (
    <Router>
      <Analytics id="UA-211655411-1" debug>
        {viewerInfo.userId && (
          <div className="App">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/401" component={ClosePage} />
              <Route path="/detail/:postId" component={Detail} />
              <Route exact path="/around" component={Around} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/write" component={Write} />
              <Route exact path="/onboarding" component={Onboarding} />
              <Route exact path="/onboarding/write" component={Write} />
              <Route path="/edit/:id" component={Write} />
            </Switch>
          </div>
        )}
      </Analytics>
    </Router>
  );
}

export default App;
