const books = require('../models/library_Books_Info');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const add_book_rack = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("CSV file uploaded:", req.file.originalname);

    // Convert CSV file to JSON
    const filePath = req.file.path; // multer saves file here
    const fileDataObj = await csv().fromFile(filePath); // csvtojson automatically converts CSV rows to objects

    console.log("Parsed CSV Data:", fileDataObj);

    // Insert into MongoDB
    const result = await books.insertMany(fileDataObj);

    console.log("Inserted books:", result.length);

    res.json({ success: true, count: result.length });
  } catch (err) {
    console.error("Error in add_book_rack:", err);
    res.status(500).json({ success: false, message: "Error uploading CSV" });
  }
};

module.exports = {
  add_book_rack
};