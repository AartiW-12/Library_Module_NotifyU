const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Lib_Books = require('../models/library_Books_Info');

router.post('/get_books' , async (req, res) => {


    try{

        const result = await Lib_Books.find({},{ _id: 0, bookid: 1, name: 1, author: 1 });

        // console.log("result", result);

        const resultArray = result.map(item => [item.bookid, item.name, item.author]);

        console.log(typeof(resultArray));
        if(result)
        {
            res.send(resultArray);
        }
        else
        {
            res.json({succcess: false });
        }  
    }
    catch(err){
        console.log("Error Occured");
    }

})

module.exports = router;