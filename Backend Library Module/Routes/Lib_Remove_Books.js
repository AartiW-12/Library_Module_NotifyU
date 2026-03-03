const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Lib_Books = require('../models/library_Books_Info');

router.post('/remove_book' , async (req, res) => {

    const BID = req.body.bookID;
    const BName = req.body.bookName;

    console.log(BID , BName );

    console.log("REQUEST IS : " , req.body);
    // res.json({success : true })

    try{
        
        const result = await Lib_Books.deleteMany( {  $or: [{ bookid: BID }, { name : BName }] } );

        console.log("result", result);

        if(result)
        {
            res.json({ succcess: true })
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