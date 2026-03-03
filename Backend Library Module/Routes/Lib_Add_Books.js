const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

// ✅ Correct absolute upload path
const uploadPath = path.join(__dirname, "../Public/uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const libCntrl = require("../controllers/libControllers");
const Lib_Books = require("../models/library_Books_Info");


// ✅ CSV Upload Route
router.post(
    "/add_book_rack",
    upload.single("booksFile"),
    libCntrl.add_book_rack
);


// ✅ Add Single Book
router.post("/add_single_book", async (req, res) => {
    try {
        const { book } = req.body;

        const result = await Lib_Books.create({
            bookid: book.bookid,
            name: book.name,
            author: book.author,
            topic1: book.topic1,
            topic2: book.topic2,
            topic3: book.topic3
        });

        res.json({ success: true, data: result });

    } catch (err) {
        console.error("Error Occurred:", err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;