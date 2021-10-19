import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Around from "./Pages/Around/Around";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail/Detail";
import Write from "./Pages/Write/Write";
import Mini from "@karrotmarket/mini";
import { useSetRecoilState } from "recoil";
import { MyInfo, RegionId } from "./Shared/atom";
import { useCallback } from "react";
import { getLogin } from "./api/user";

function App() {
  const mini = new Mini();
  const setRegionId = useSetRecoilState(RegionId);

  // 로그인 및 내 정보 저장
  const setMyInfo = useSetRecoilState(MyInfo);
  const getMyInfo = useCallback(
    async (code: string) => {
      const data = await getLogin(code);
      setMyInfo(data);
    },
    [setMyInfo]
  );

  mini.startPreset({
    preset:
      "https://mini-assets.kr.karrotmarket.com/presets/common-login/alpha.html",
    params: {
      appId: process.env.REACT_APP_APP_ID as string,
    },
    onSuccess: function (result) {
      if (result && result.code) {
        const regionId = new URLSearchParams(window.location.search).get(
          "region_id"
        );

        getMyInfo(result.code);
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
          <Route path="/detail/:id">
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
          <Route path="/edit/:id">
            <Write />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
