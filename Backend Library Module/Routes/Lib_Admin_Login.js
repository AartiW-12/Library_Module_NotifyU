const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* ===============================
   Update Admin Password
================================ */
async function updatePassword(newPassword) {
  try {
    const result = await mongoose.connection.db
      .collection("library_admin_logintbs")
      .updateOne(
        { Lib_Admin_username: "Admin-library" },
        { $set: { password: newPassword } }
      );

    return result.modifiedCount === 1;
  } catch (error) {
    console.error("Update Password Error:", error);
    return false;
  }
}

/* ===============================
   Get Current Admin Password
================================ */
async function getCurrentPassword() {
  try {
    const admin = await mongoose.connection.db
      .collection("library_admin_logintbs")
      .findOne({ Lib_Admin_username: "Admin-library" });

    return admin ? admin.password : null;
  } catch (error) {
    console.error("Fetch Password Error:", error);
    return null;
  }
}

/* ===============================
   ADMIN LOGIN
================================ */
router.post('/library_admin_login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: "Missing credentials" });
    }

    const admin = await mongoose.connection.db
      .collection("library_admin_logintbs")
      .findOne({
        Lib_Admin_username: username,
        password: password
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
router.post('/library_admin_update_password', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.json({ success: false, message: "Password required" });
  }

  const updated = await updatePassword(password);

  if (updated) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

/* ===============================
   CHECK CURRENT PASSWORD
================================ */
router.post('/library_admin_check_current_password', async (req, res) => {
  const { curPassword } = req.body;

  if (!curPassword) {
    return res.json({ success: false });
  }

  const storedPassword = await getCurrentPassword();
  console.log("StoredPass : ", storedPassword)

  if (!storedPassword) {
    return res.json({ success: false });
  }

  if (curPassword === storedPassword) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

module.exports = router;
