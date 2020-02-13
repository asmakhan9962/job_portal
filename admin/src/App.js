import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Category from './components/pages/Category';
import City from './components/pages/City';
import Job from './components/pages/Job';
import Alerts from './components/layouts/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/Routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CategoryState from './context/category/CategoryState';
import CityState from './context/city/CityState';
import JobState from './context/job/JobState';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <CategoryState>
          <CityState>
            <JobState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className="container">
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/home' component={Home} />
                      <Route exact path='/' component={Login} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/categories' component={Category} />
                      <Route exact path='/cities' component={City} />
                      <Route exact path='/jobs' component={Job} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </JobState>
          </CityState>
        </CategoryState>
      </AlertState>
    </AuthState>
  );
}

export default App;
