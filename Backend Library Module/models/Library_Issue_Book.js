const mongoose = require('mongoose');
const {Schema} = mongoose;

const IssuedBookSchema = new Schema(
    {
        BookID:{
            type:String
        },
        BookName:{
            type:String
        },
        studentID : {
            type:String
        },
        IssuedDate:{
            type:Date
        },
        LastDate:{
            type:Date
        },
        fees :{
            type : Number,
            default : 0
        }
    }
);

module.exports = mongoose.model("IssuedBookTable",IssuedBookSchema);