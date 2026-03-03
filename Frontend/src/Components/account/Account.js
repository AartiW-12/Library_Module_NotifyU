import React, { useState } from "react";
import "./Account.css";
import axios from "axios";

export default function Account({ handleSignIn }) {

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  // 🔹 Logout
  const handleLogOut = () => {
    handleSignIn(false, "");
  };

  // 🔹 Change Password API Logic
  const handleProceed = async () => {

    if (!currentPassword || !newPassword) {
      setMessageColor("red");
      setMessage("Please fill all fields!");
      return;
    }

    try {
      // 1️⃣ Check current password
      const checkRes = await axios.post(
        "https://library-module-notifyu.onrender.com/api/library_admin_check_current_password",
        { curPassword: currentPassword }
      );

      if (!checkRes.data.success) {
        setMessageColor("red");
        setMessage("Current password is incorrect!");
        return;
      }

      // 2️⃣ Update password
      const updateRes = await axios.post(
        "https://library-module-notifyu.onrender.com/api/library_admin_update_password",
        { password: newPassword }
      );

      if (updateRes.data.success) {
        setMessageColor("green");
        setMessage("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessageColor("red");
        setMessage("Failed to update password!");
      }

    } catch (error) {
      setMessageColor("red");
      setMessage("Server error!");
      console.log(error);
    }
  };

  return (
    <div className="accountImgBG">
      <div className="accountImgCover">
        <div className="accountContainer">
          <div className="accountContainertitle">
            NotifyU-Admins | Library
          </div>

          {!showChangePassword ? (
            <div className="libraryBtnBG">
              <div
                className="changePassword"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </div>
              <div className="logOut" onClick={handleLogOut}>
                Log Out
              </div>
            </div>
          ) : (
            <div className="changePasswordBG">
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <div className="changePasswordBtnBG">
                <div
                  className="cancel"
                  onClick={() => {
                    setShowChangePassword(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </div>

                <div className="proceed" onClick={handleProceed}>
                  Proceed
                </div>
              </div>

              {message && (
                <div style={{ color: messageColor, marginTop: "10px" }}>
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}