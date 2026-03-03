import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login({ handleSignIn }) {

  const [username] = useState("Admin-library");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔹 Handle Login
  const handleLogin = async () => {
    if (!password) {
      setError("Please enter password");
      return;
    }

    try {
      const result = await axios.post(
        "https://library-module-notifyu.onrender.com/api/library_admin_login",
        { username, password }
      );

      if (result.data.success) {
        handleSignIn(true, username);
      } else {
        setError("Invalid password");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again.");
    }
  };

  // 🔹 Clear Fields
  const handleClear = () => {
    setPassword("");
    setError("");
  };

  return (
    <div className="imgContainer">
      <div className="imgCover">
        <div className="loginContainer">

          <div className="logInBrand">
            NotifyU-Admins | Library
          </div>

          <input
            className="inputs"
            type="text"
            value={username}
            readOnly
          />

          <input
            className="inputs"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <div className="btnBG">
            <button className="buttons" onClick={handleClear}>
              Clear
            </button>
            <button className="buttons" onClick={handleLogin}>
              Login
            </button>
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}