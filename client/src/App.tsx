import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Around from "./Pages/Around";
import Mypage from "./Pages/Mypage";
import Detail from "./Pages/Detail";
import Write from "./Pages/Write";
import Mini from "@karrotmarket/mini";

function App() {
  const mini = new Mini();

  mini.startPreset({
    preset:
      "https://mini-assets.kr.karrotmarket.com/presets/common-login/alpha.html",
    params: {
      appId: process.env.REACT_APP_APP_ID as string,
    },
    onSuccess: function (result) {
      if (result && result.code) {
        console.log(result.code);
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
