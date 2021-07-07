// import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Messenger from './pages/messenger/Messenger.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import {useContext} from 'react';

function App() {

  const {user} = useContext(AuthContext);
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login/>}
          </Route>
          <Route path="/login">
            {user ? <Redirect to='/messenger'/> : <Login />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to='/'/> : <Register />}
          </Route>
          <Route path="/messenger">
            {!user ? <Redirect to='/login'/> : <Messenger />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
