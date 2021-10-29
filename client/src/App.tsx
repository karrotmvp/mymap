import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Around from "./Pages/Around/Around";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail";
import Write from "./Pages/Write/Write";
import Mini from "@karrotmarket/mini";
import { useSetRecoilState } from "recoil";
import { ViewerInfo, RegionId } from "./Shared/atom";
import { useCallback } from "react";
import { getLogin } from "./api/user";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ClosePage from "./Pages/ClosePage";
import Onboarding from "./Pages/Onboarding";

dayjs.locale("ko");

const mini = new Mini();

function App() {
  const setRegionId = useSetRecoilState(RegionId);

  // 로그인 및 내 정보 저장
  const setMyInfo = useSetRecoilState(ViewerInfo);
  const getMyInfo = useCallback(
    async (code: string, regionId: string) => {
      const data = await getLogin(code, regionId);
      setMyInfo({
        userId: data.userId,
        userName: data.userName,
        regionName: data.regionName,
      });
      localStorage.setItem("token", data.token);
    },
    [setMyInfo]
  );

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
        const regionId = new URLSearchParams(window.location.search).get(
          "region_id"
        );

        getMyInfo(result.code, regionId as string);
        setRegionId(regionId as string);
      }
    },
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/401">
            <ClosePage />
          </Route>
          <Route path="/detail/:postId">
            <Detail />
          </Route>
          <Route exact path="/around">
            <Around />
          </Route>
          <Route exact path="/mypage">
            <Mypage />
          </Route>
          <Route exact path="/write">
            <Write />
          </Route>
          <Route exact path="/onboarding">
            <Onboarding />
          </Route>
          <Route exact path="/onboarding/write">
            <Write />
          </Route>
          <Route path="/edit/:id">
            <Write />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
