import { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import NotificationPage from './views/LandingPage/NotificationPage';
import PostPage from './views/LandingPage/PostPage';
import UserPage from './views/LandingPage/UserPage';
import LoginPage from './views/LoginPage/loginPage';
import NavBar from './views/NavBar/NavBar';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar/>
      <div>
        <Switch>
          <Route exact path="/post" component={PostPage}/>
          <Route exact path="/user" component={UserPage}/>
          <Route exact path="/notification" component={NotificationPage}/>
          <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
