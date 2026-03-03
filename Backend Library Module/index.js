const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
const cors = require('cors');
const mongoDB = require('./ConnectionMongoDB');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
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
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("❌ Server NOT started (MongoDB connection failed)");
  });
