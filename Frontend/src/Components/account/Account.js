import React from 'react'
import "./Account.css";
import axios from 'axios';
export default function Account({ handleSignIn }) {



  // checkCurrentPassword: [express js]
  const checkCurrentPassword = async (curPassword) => {
    let response;

    // express code goes here...
    // console.log("CURRENT PASSWORD: " + curPassword);
    response = await axios.post('http://localhost:5002/api/library_admin_check_current_password' , { curPassword });;
    // console.log(typeof(response.data.success));

    const checkPass = response.data.success;
    // console.log(typeof(checkPass));
    return checkPass ;
  }

  // updatePassword: [express js]
  const updatePassword = async ( password ) => {
    let response;

    // express code goes here...

    response = await axios.post('http://localhost:5002/api/library_admin_update_password' , { password });
    // success = result.data.success;

    console.log(response.data.success);

    const updatePass = response.data.success;

     return updatePass;
  }


  // handleLogOut:
  const handleLogOut = () => {
    handleSignIn(false, "");
  }

  // handleChangePassword:
  const handleChangePassword = () => {
    document.getElementById("libraryBtnBG").style.display = "none";
    document.getElementById("changePasswordBG").style.display = "flex";
  }

  // setChangePasswordButtons:
  const setCancelButtons = (flg) => {
    if (flg) {
      return (
        <div className="cancel" onClick={handleCancel}>cancel</div>
      )
    }
    else {
      const cancel = document.createElement("div");
      cancel.className = "cancel";
      cancel.onclick = handleCancel;
      cancel.innerHTML = "cancel";
      return cancel;
    }
  }

  // setChangePasswordBtn:
  const setChangePasswordBtn = (flg) => {
    if (flg) {
      return (
        <div className="proceed" onClick={handleProceed}>proceed</div>
      )
    }
    else {
      const proceed = document.createElement("div");
      proceed.className = "proceed";
      proceed.onclick = handleProceed;
      proceed.innerHTML = "proceed";
      return proceed;
    }
  }

  // handleKeyDown:
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleProceed();
  }

  // handeCancel:
  const handleCancel = () => {
    document.getElementById("libraryBtnBG").style.display = "flex";
    document.getElementById("changePasswordBG").style.display = "none";
  }

  // handleProceed:
  const handleProceed = () => {
    const curPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");

    const target = document.getElementById("changePasswordBtnBG");
    if (curPassword.value !== "" && newPassword.value !== "") {
    const check =   checkCurrentPassword(curPassword.value);
    const ans = check.toString();
      console.log(ans);
      if (check) { // Express call.
        console.log("I AM IN CURRENT PASSWORD");
        const updatePass = updatePassword(newPassword.value); // Express call.
        const updatePsw = updatePass.toString();
        if (updatePsw ) {
          while (target.firstChild) {
            target.removeChild(target.firstChild);
          }
          target.style.color = "rgb(0,255,0)";
          target.innerHTML = "Password Updated Successfully!";
          setTimeout(() => {
            target.innerHTML = "";
            target.appendChild(setCancelButtons(false));
            target.append(setChangePasswordBtn(false));
          }, 2000);
        }
        else {
          while (target.firstChild) {
            target.removeChild(target.firstChild);
          }
          target.style.color = "rgb(255,0,0)";
          target.innerHTML = "Failed to update password!";
          setTimeout(() => {
            target.innerHTML = "";
            target.appendChild(setCancelButtons(false));
            target.append(setChangePasswordBtn(false));
          }, 2000);
        }
        curPassword.value = "";
        newPassword.value = "";
      }
    }
    else {
      while (target.firstChild) {
        target.removeChild(target.firstChild);
      }
      target.style.color = "rgb(255,0,0)";
      target.innerHTML = "Something went wrong!!!";
      setTimeout(() => {
        target.innerHTML = "";
        target.appendChild(setCancelButtons(false));
        target.append(setChangePasswordBtn(false));
      }, 2000);
    }
    curPassword.value = "";
    newPassword.value = "";
  }



  return (
    <>
      <div className="accountImgBG">
        <div className="accountImgCover">
          <div className="accountContainer">
            <div className="accountContainertitle">
              NotifyU-Admins | Library
            </div>
            <div className="libraryBtnBG" id='libraryBtnBG'>
              <div className="changePassword" onClick={handleChangePassword}>Change Password</div>
              <div className="logOut" onClick={handleLogOut}>Log Out</div>
            </div>
            <div className="changePasswordBG" id='changePasswordBG' style={{ display: "none" }}>
              <input type="text" className="currentPassword" id='currentPassword' onKeyDown={handleKeyDown} placeholder='Enter current password' />
              <input type="text" className="newPassword" id='newPassword' onKeyDown={handleKeyDown} placeholder='Enter new password' />
              <div className="changePasswordBtnBG" id='changePasswordBtnBG'>
                {setCancelButtons(true)}
                {setChangePasswordBtn(true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
