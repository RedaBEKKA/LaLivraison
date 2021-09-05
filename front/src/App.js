import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './component/LandingPage/landingPage';
import Formulaire from './component/Fomulaire/Formulaire';
import CreatCmd from './../src/component/adminPage/CreateCmd'


function App() {
  return (
    <>
      <Router>
        <Switch >

          <Route exact path='/' component={LandingPage} />
          <Route exact path='/sign' component={Formulaire} />
          <Route exact path='/admin' component={CreatCmd} />

        </Switch>

      </Router>
    </>

  );
}

export default App;
