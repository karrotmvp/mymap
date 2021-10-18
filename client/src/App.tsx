import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Around from "./Pages/Around/Around";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail/Detail";
import Write from "./Pages/Write/Write";
import Mini from "@karrotmarket/mini";
import { useSetRecoilState } from "recoil";
import { RegionId } from "./Shared/atom";

function App() {
  const mini = new Mini();
  const setRegionId = useSetRecoilState(RegionId);

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
        console.log(result.code, regionId);
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
