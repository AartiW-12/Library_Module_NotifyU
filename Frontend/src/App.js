import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Navbar from "./Components/navbar/Navbar";
import Login from "./Components/login/Login";
import Books from "./Components/books/Books";
import IssuedBooks from "./Components/issuedBooks/IssuedBooks";
import Account from "./Components/account/Account";

function App() {

  const checkSignIn = () => {
    if(localStorage.getItem("lib_username") === ""){
      return false;
    }
    else return true;
  }

  const [login, setLogin] = useState(checkSignIn());
  const setlogin = (isLoggedIn, username) => {
    localStorage.setItem("lib_username", username)
    setLogin(isLoggedIn);
  }


  return (
    <>
      <Router>
        <Switch>
          
          <Route exact path="/">
          {
              login ? (
                <>
                  <Navbar/>
                  <Books />
                </>
              ) :
                (
                  <Login handleSignIn={setlogin}/>
              )
            }
          </Route>

          <Route exact path="/Components/issuedBooks/IssuedBooks">
          {
              login ? (
                <>
                  <Navbar/>
                  <IssuedBooks />
                </>
              ) :
                (
                  <Login handleSignIn={setlogin}/>
              )
            }
          </Route>

          <Route exact path="/Components/account/Account">
          {
              login ? (
                <>
                  <Navbar/>
                  <Account  handleSignIn={setlogin}  />
                </>
              ) :
                (
                  <Login handleSignIn={setlogin}/>
              )
            }
          </Route>

        </Switch>
      </Router>
    </>
  )
}

export default App;
