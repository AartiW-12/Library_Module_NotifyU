const mongoose = require('mongoose');

const mongoURI =
  "mongodb+srv://NotifyU:NotifyU123@cluster0.k4dsap2.mongodb.net/?appName=cluster0";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = mongoDB;
