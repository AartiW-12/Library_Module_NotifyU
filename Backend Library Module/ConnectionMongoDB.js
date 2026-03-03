const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://NotifyU:NotifyU123@cluster0.k4dsap2.mongodb.net/CollegeDB";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB Connected");

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = mongoDB;