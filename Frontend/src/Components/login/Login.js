import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ handleSignIn }) {

  const [username] = useState("Admin-library");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  // 🔹 Handle Login
  const handleLogin = async () => {
    if (!password) {
      setError("Please enter password");
      return;
    }

    try {
      // 🔹 Send POST request to backend
      const res = await axios.post(
        "http://localhost:5002/api/library_admin_login",
        {
          username,
          password,
        }
      );

      console.log("Login response:", res.data);

      // 🔹 Check response from backend
      if (res.data.success) {
        handleSignIn(true, username); // login successful
        setError("");                 // clear any previous errors
        navigate("/");               // redirect to Books page
      } else {
        setError(res.data.message || "Invalid username or password");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
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