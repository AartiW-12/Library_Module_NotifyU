const mongoose = require("mongoose");
const { Schema } = mongoose;
const Lib_Admin_Login_Schema = new Schema(
    {
        Lib_Admin_username:{
            type:String
        },
        Lib_Admin_password:{
            type:String
        }
    }
);

module.exports = mongoose.model("Library_Admin_LoginTB",Lib_Admin_Login_Schema);