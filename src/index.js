import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Restaurant from './screens/Restaurant';
import Home from './screens/Home';
import axios from 'axios';

axios.get('http://localhost:8080/profile')
  .then(function(response) {
    localStorage.setItem('id', response.data.id)
    localStorage.setItem('name', response.data.name)
    localStorage.setItem('email', response.data.email)
    localStorage.setItem('credit', response.data.credit)
    localStorage.setItem('phoneNumber', response.data.phoneNumber)
  })
  .catch(function(error) {
    console.log(error)
  });

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Signup} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />
      <Route path='/restaurant/*' component={Restaurant} />
      <Route exact path='/home' component={Home} />
    </div>
</BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
