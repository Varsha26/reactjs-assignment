import React, { Fragment, useEffect } from "react";
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Teams from './components/Teams';
import Dash from './components/Dash';
import Alert from "./components/Alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect( ()=> {
    store.dispatch(loadUser());
}, [loadUser])// [] to run only once 
  return (
    <Provider store={store}>
          <Router>
            <div>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </div>
          </Router>
          {/* <Router>
            <div>
              <Route path="/login" component={Login} />
              <Dashboard />
              <Switch>
                <Route exactly component={Dash} pattern="/dash" />
                <Route exactly component={About} pattern="/about" />
                <Route exactly component={Teams} pattern="/teams" />
              </Switch>
            </div>
          </Router> */}
      {/* <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <section className="App">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/about' component={About} />
              <Route exact path='/teams' component={Teams} />
            </Switch>
          </section>
        </Fragment>
      </Router> */}
    </Provider>
    
  );
}

export default App;
