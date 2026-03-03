const mongoose = require('mongoose');
const {Schema} = mongoose;

const Lib_Books = new Schema(
    {
        bookid:{
            type:String
        },
        name:{
            type:String
        },
        author:{
            type:String
        },
        topic1:{
            type:String
        },
        topic2:{
            type:String
        },
        topic3:{
            type:String
        }
    }
);

module.exports = mongoose.model("LibraryBookInfoTable",Lib_Books);