const mongoose = require('mongoose');

const libraryBookSchema = new mongoose.Schema({
  bookid: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  topic1: { type: String },
  topic2: { type: String },
  topic3: { type: String },
},
{
   collection: "librarybookinfotables" 
});

module.exports = mongoose.model('LibraryBookInfo', libraryBookSchema); // ⚠ match name