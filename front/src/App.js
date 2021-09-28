import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './component/LandingPage/landingPage';
import Formulaire from './component/Fomulaire/Formulaire';
import CreatCmd from './../src/component/adminPage/CreateCmd'
import login from './../src/component/auth/login'
import Register from './../src/component/auth/register';
import ActivationCompte from './component/auth/ActivationCompte';
import {useSelector} from 'react-redux'
import NotFound from './utils/notFound/NotFound';
import ForgotPassword from './component/auth/forgotPassword';
import ResetPassword from './component/auth/ResetPassword';
import Profile from './component/profile/Profile';
import EditUser from './component/profile/EditUser'
import TestMenu from './component/test/TestMenu';
import partenaires from './component/partenaires/partenaires';
import Restaurants from './component/partenaires/Restaurants';
import patisseries from './component/partenaires/patisseries';
import dashborad from './component/dashborad/dashborad';

function App() {
  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin} = auth
  return (
    <>
      <Router>
        <Switch >

          <Route exact path='/' component={LandingPage} />
          <Route exact path='/sign' component={Formulaire} />
          <Route exact path='/admin' component={CreatCmd} />
          <Route exact path='/forgot_password' component={ForgotPassword} />
          <Route exact path='/reset/:token' component={ResetPassword} />
          <Route exact path='/connexion' component={isLogged ? NotFound : login}  />
          <Route exact path='/inscrire' component={isLogged ? NotFound : Register} />
          <Route exact path='/user/activate/:activation_token' component={ActivationCompte} />
          <Route path="/dashborad" component={ isAdmin ?    dashborad : NotFound  } exact />
          <Route path="/profile" component={isLogged && isAdmin ?    Profile : NotFound  } exact />
          <Route path="/testMenu" component={isLogged ?    TestMenu : NotFound  } exact />
          <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
          <Route path="/partenaires" component={isAdmin ? partenaires : NotFound} exact />
          <Route path="/partenaires/Restaurants" component={isAdmin ? Restaurants : NotFound} exact />
          <Route path="/partenaires/pâtisseries" component={isAdmin ? patisseries : NotFound} exact />
          


        </Switch>

      </Router>
    </>

  );
}

export default App;
