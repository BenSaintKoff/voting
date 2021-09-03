import _ from 'lodash'
import React, { Component } from 'react'
//import { Button, Card, Divider, Image, Placeholder, Segment} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
//import Cards from './components/Cards';
import Home from './pages/Home';
import Result from './pages/Result';
import Accueil from './pages/Accueil';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css";


ReactDOM.render(
  <React.StrictMode>
  
   <Router>
    <div  className='App' style={{height:'800px'}}>
      <Switch>
        <Route exact path ="/" component={Accueil}/>
        <Route  path ="/home" component={Home}/>
        <Route  path ="/result" component={Result}/>
      </Switch>
    </div>
   </Router>
    
  
 

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
