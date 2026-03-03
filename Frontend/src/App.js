import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Components/login/Login";
import Books from "./Components/books/Books";
import IssuedBooks from "./Components/issuedBooks/IssuedBooks";
import Account from "./Components/account/Account";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";

function App() {
  const [login, setLogin] = useState(!!localStorage.getItem("lib_username"));

  const setlogin = (isLoggedIn, username) => {
    if (isLoggedIn) {
      localStorage.setItem("lib_username", username);
    } else {
      localStorage.removeItem("lib_username");
    }
    setLogin(isLoggedIn);
  };

  return (
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login handleSignIn={setlogin} />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute login={login} />}>
          <Route path="/" element={<Books />} />
          <Route path="/issued-books" element={<IssuedBooks />} />
          <Route path="/account" element={<Account handleSignIn={setlogin} />} />
        </Route>
      </Routes>
  );
}

export default App;