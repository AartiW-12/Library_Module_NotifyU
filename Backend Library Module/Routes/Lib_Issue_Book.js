const express = require("express");
const router = express.Router();

const IssueBook = require("../models/Library_Issue_Book");

// ✅ Calculate overdue fees dynamically
function calculatePendingFees(lastDate) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();

    const daysOverdue = Math.max(
        0,
        Math.floor((currentDate - new Date(lastDate)) / millisecondsPerDay)
    );

    return daysOverdue;
}


/* ===============================
   ISSUE BOOK
================================ */
router.post("/lib_Issue_book", async (req, res) => {
    try {
        const {
            bookid,
            bookname,
            studentid,
            issueddate,
            collectingdate
        } = req.body;

        // ✅ Basic validation
        if (!bookid || !bookname || !studentid || !issueddate || !collectingdate) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const newBook = await IssueBook.create({
            BookID: bookid,
            BookName: bookname,
            studentID: studentid,
            IssuedDate: issueddate,
            LastDate: collectingdate,
            fees: 0  // Initially 0
        });

        res.json({ success: true, data: newBook });

    } catch (err) {
        console.error("Issue Error:", err);
        res.status(500).json({ success: false });
    }
});


/* ===============================
   GET BOOKS BY STUDENT ID
================================ */
router.post("/get_issued_book_by_PRN", async (req, res) => {
    try {
        const key = req.body.key;

        if (!key) {
            return res.status(400).json({ success: false });
        }

        const books = await IssueBook.find({ studentID: key });

        // ✅ Update fees dynamically before sending
        const updatedBooks = books.map(book => {
            const calculatedFees = calculatePendingFees(book.LastDate);
            return {
                ...book._doc,
                fees: calculatedFees
            };
        });

        res.json(updatedBooks);

    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).json({ success: false });
    }
});


/* ===============================
   GET BOOKS BY BOOK ID
================================ */
router.post("/get_issued_book_by_BookID", async (req, res) => {
    try {
        const key = req.body.key;

        if (!key) {
            return res.status(400).json({ success: false });
        }

        const books = await IssueBook.find({ BookID: key });

        const updatedBooks = books.map(book => {
            const calculatedFees = calculatePendingFees(book.LastDate);
            return {
                ...book._doc,
                fees: calculatedFees
            };
        });

        res.json(updatedBooks);

    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;