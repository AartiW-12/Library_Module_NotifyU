const express = require("express");
const router = express.Router();

const AdminModel = require("../models/LibraryAdmin_Login");

/* ===============================
   ADMIN LOGIN
================================ */
router.post("/library_admin_login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: "Missing credentials" });
    }

    const admin = await AdminModel.findOne({
      Lib_Admin_username: username,
      Lib_Admin_password: password   // ✅ correct field
    });

    if (admin) {
      return res.json({ success: true });
    }

    return res.json({ success: false });

  } catch (error) {
    console.error("Login Error:", error);
    return res.json({ success: false });
  }
});


/* ===============================
   UPDATE PASSWORD
================================ */
router.post("/library_admin_update_password", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.json({ success: false, message: "Password required" });
    }

    const result = await AdminModel.updateOne(
      { Lib_Admin_username: "Admin-library" },
      { $set: { Lib_Admin_password: password } }   // ✅ correct field
    );

    return res.json({ success: result.modifiedCount === 1 });

  } catch (error) {
    console.error("Update Password Error:", error);
    return res.json({ success: false });
  }
});


/* ===============================
   CHECK CURRENT PASSWORD
================================ */
router.post("/library_admin_check_current_password", async (req, res) => {
  try {
    const { curPassword } = req.body;

    if (!curPassword) {
      return res.json({ success: false });
    }

    const admin = await AdminModel.findOne({
      Lib_Admin_username: "Admin-library"
    });

    if (!admin) {
      return res.json({ success: false });
    }

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