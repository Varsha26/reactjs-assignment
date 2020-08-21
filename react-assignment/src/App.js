import React, {useEffect } from "react";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Alert from "./components/Alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
              <Alert />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </div>
          </Router>
    </Provider>
    
  );
}

export default App;
