const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ObjectId } = require('mongodb');

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');  
var csvtojson = require('csvtojson');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname,'Public')));

var storage = multer.diskStorage({ 
    destination : (req , file , cb)=> {
        cb(null , '../Public/uploads/')
    },
    filename : (req , file , cb)=> {
        cb(null,file.originalname)
    }

})

var upload = multer({ storage : storage });

const libCntrl = require('../controllers/libControllers')
const Lib_Books = require('../models/library_Books_Info');
// const checkFileUpload = (req, res, next) => {
//     if (!req.file) {
//         console.log("no file is here");
//         return res.json({ success: false, message: 'No file uploaded' });
//     }
//     next();
// };

router.post('/add_book_rack', upload.single('booksFile'), libCntrl.add_book_rack);




// router.post('/add_book_rack',upload.single('booksFile'), async (req, res) => {

//     console.log("request of add book rack ", req.body);
//     if(!req.file)
//     {
//         res.json({success: false });
//     }
    //console.log(req.file);
    // csvtojson()
    // .fromFile('')
    // .then(csvrouter => {
    //     console.log(csvrouter);
    //     Post.insertMany(csvrouter).then( function () {
    //         console.log("router inserted successfully");
    //         res.json({ success: true })
    //     }).catch(function (err) {
    //         console.log("Error Occured ");
    //     })
    // })
    
//     res.json({ success: true})
// });


router.post('/add_single_book' , async (req, res) => {

    const BID = req.body.book.bookid;
    const BName = req.body.book.name;
    const BAuthor = req.body.book.author;
    const t1 = req.body.book.topic1;
    const t2 = req.body.book.topic2;
    const t3 = req.body.book.topic3;

    console.log(BID , BName , BAuthor ,  t1 ,  t2 , t3   );

    try{

        const result = await Lib_Books.insertMany({ bookid : BID  , name : BName , author : BAuthor , topic1 : t1 , topic2 : t2 , topic3 : t3 });

        console.log(result);

        if(result)
        {
            console.log("Book inserted successfully");
            res.json("true")
        }
        else
        {
            res.json("flase")
        }

        // res.json("true")
    }
    catch(err) {
        console.log("Error Occured ",err);
    }
        
});

// router.post('/add_book_rack', async (req, res) => {

//     console.log("request of add book rack ", req.body);

//     csvtojson()
//     .fromFile('tableConvert.com_pdhv2m.csv')
//     .then(csvrouter => {
//         console.log(csvrouter);
//         Post.insertMany(csvrouter).then( function () {
//             console.log("router inserted successfully");
//             res.json({ success: true })
//         }).catch(function (err) {
//             console.log("Error Occured ");
//         })
//     })
// });

module.exports = router;