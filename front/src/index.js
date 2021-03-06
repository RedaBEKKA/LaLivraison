import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './component/theme'
import { ThemeProvider } from 'react-bootstrap';
// import {Provider} from 'react-redux'   ; 
// import{compose ,createStore, applyMiddleware} from 'redux'  ; 
// import thunk from 'redux-thunk'
// import reducers from './redux/reducers/index'
// import { composeWithDevTools } from 'redux-devtools-extension';
import DataProvider from './../src/redux/store'
// const store = createStore(reducers , composeWithDevTools(applyMiddleware(thunk))) ; 

// , compose(applyMiddleware(thunk))
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

    <DataProvider >
    <App />
    </DataProvider>

    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
