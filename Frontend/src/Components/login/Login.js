import React from 'react';
import "./Login.css";
import axios from 'axios';

export default function Login({ handleSignIn }) {

  // handleLogin: [Express JS]
  const handleLogin = async () => {

    try{
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;


    // express code goes here...
     const result  = await axios.post('http://localhost:5002/api/library_admin_login' ,{ username , password });
       
      console.log(result.data.success);
      // console.log(result);
      console.log(result.data.success);
      if (result.data.success) {
        handleSignIn(true, username);
      }
      handleSignIn(true, username)

    }
    catch (error) {
        console.error("Login error:", error);
    }
        
   
  }

 /// handleClear:
  const handleClear = () => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

  // handleEnter:
  const handleEnter = (e) => {
    if (e.key === 'Enter') handleLogin();
  }

  return (
    <div className='imgContainer'>
      <div className='imgCover'>
        <div className='loginContainer'>
          <div className="logInBrand">NotifyU-Admins | Library</div>
          <input className='inputs' onKeyDown={handleEnter} id="username" type='text' value="Admin-library" readOnly></input>
          <input className='inputs' onKeyDown={handleEnter} id="password" type='password' placeholder='password'></input>
          <div className="btnBG">
            <button className='buttons' onClick={handleClear}>Clear</button>
            <button className='buttons' onClick={handleLogin}>login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
