import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Around from "./Pages/Around";
import Mypage from "./Pages/Mypage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <Main />
          </Route>
          <Route path="/around">
            <Around />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
