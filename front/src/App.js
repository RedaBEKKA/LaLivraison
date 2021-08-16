import './App.css';
import React from 'react';
import {BrowserRouter as Router,Switch , Route} from'react-router-dom'
import LandingPage from './component/LandingPage/landingPage';
import Formulaire from './component/Fomulaire/Formulaire';



function App() {
  return (  
    <>
    <Router>
         <Switch >
          
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/sign' component={Formulaire} />

         </Switch>

    </Router>
    </>
   
  );
}

export default App;
