const express = require("express");
const router = express.Router();
const LibraryBookInfoTable = require("../models/library_Books_Info");

// ✅ Correct route name and method
router.get("/get_books", async (req, res) => {
  try {
    const books = await LibraryBookInfoTable.find();
    console.log("Books fetched:", books);
    res.json(books);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;