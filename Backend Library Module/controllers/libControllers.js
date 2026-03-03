
const books = require('../models/library_Books_Info');
const csv = require('csvtojson');
const fs = require('fs');

const add_book_rack = async (req, res) => {
    try {
        var lib_book_data = [];
        console.log("i am in add book rack");

        let fileDATA = req.body;
        console.log(fileDATA);
        let strdata = JSON.stringify(fileDATA).split("\\n");
        let strData1 = strdata.slice(1, strdata.length);
        

        let data = []
        strData1.forEach((row) => {
            let dataRow = row.split(",");
            data.push(dataRow);
        })

        let fileDataObj = [];
        data.forEach((row) => {
            let obj = {
                bookid: row[0],
                name: row[1],
                author: row[2],
                topic1: row[3],
                topic2: row[4],
                topic3: row[5],
            }
            fileDataObj.push(obj);
        });

        console.log(fileDataObj);

       const result = await books.insertMany(fileDataObj);
       console.log(result);

       if(result)
       {
            res.json({ success: true });
       }
       else
       {
            res.json({ success: false});
       }

        
    }
    catch (e) {
        res.json({ success: false })
    }
}

module.exports = {
    add_book_rack
};