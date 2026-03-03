const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
const cors = require('cors');
const mongoDB = require('./ConnectionMongoDB');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require('./Routes/Lib_Admin_Login'));
app.use('/api', require('./Routes/Lib_Add_Books'));
app.use('/api', require('./Routes/Lib_Remove_Books'));
app.use('/api', require('./Routes/Lib_Get_Books'));
app.use('/api', require('./Routes/Lib_Issue_Book'));

mongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  });