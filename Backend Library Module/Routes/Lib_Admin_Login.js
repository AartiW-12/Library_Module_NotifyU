const express = require("express");
const router = express.Router();
const AdminModel = require("../models/LibraryAdmin_Login");

/* ===============================
   ADMIN LOGIN
================================ */
router.post("/library_admin_login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.json({ success: false, message: "Missing credentials" });
    }

    username = username.trim();
    password = password.trim();

    const admin = await AdminModel.findOne({ Lib_Admin_username: username });

    console.log("Admin found:", admin);
console.log("Password from DB:", admin.Lib_Admin_password);
console.log("Password entered:", password);

    if (!admin) return res.json({ success: false, message: "User not found" });

    if (admin.Lib_Admin_password.trim() === password.trim()) {
      return res.json({ success: true, message: "Login successful" });
    }

    return res.json({ success: false, message: "Invalid password" });

  } catch (error) {
    console.error("Login Error:", error);
    return res.json({ success: false, message: "Server error" });
  }
});

/* ===============================
   UPDATE PASSWORD
================================ */
router.post("/library_admin_update_password", async (req, res) => {
  try {
    let { password } = req.body;
    if (!password) {
      return res.json({ success: false, message: "Password required" });
    }

    password = password.trim();

    const result = await AdminModel.updateOne(
      { Lib_Admin_username: "Admin-library" },
      { $set: { Lib_Admin_password: password } }
    );

    return res.json({
      success: result.modifiedCount === 1,
      message: result.modifiedCount === 1 ? "Password updated" : "No changes made"
    });
  } catch (error) {
    console.error("Update Password Error:", error);
    return res.json({ success: false, message: "Server error" });
  }
});

/* ===============================
   CHECK CURRENT PASSWORD
================================ */
router.post("/library_admin_check_current_password", async (req, res) => {
  try {
    let { curPassword } = req.body;
    if (!curPassword) return res.json({ success: false });

    curPassword = curPassword.trim();

    const admin = await AdminModel.findOne({
      Lib_Admin_username: "Admin-library"
    });

    if (!admin) return res.json({ success: false });

    if (admin.Lib_Admin_password === curPassword) {
      return res.json({ success: true });
    }

    return res.json({ success: false });
  } catch (error) {
    console.error("Check Password Error:", error);
    return res.json({ success: false });
  }
});

module.exports = router;