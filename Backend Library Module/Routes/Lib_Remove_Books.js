const express = require("express");
const router = express.Router();

const LibraryBookInfoTable = require("../models/library_Books_Info");

// DELETE book by bookid
router.delete("/removebook", async (req, res) => {
  try {
    const { bookid, name } = req.body;

    let deletedBook;
    if (bookid) {
      deletedBook = await LibraryBookInfoTable.findOneAndDelete({ bookid });
    } else if (name) {
      deletedBook = await LibraryBookInfoTable.findOneAndDelete({ name });
    } else {
      return res.status(400).json({ message: "Provide bookID or name" });
    }

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ success: true, message: "Book removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting book" });
  }
});
module.exports = router;