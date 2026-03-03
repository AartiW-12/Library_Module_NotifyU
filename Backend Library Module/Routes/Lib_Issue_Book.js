const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const issue_book = require('../models/Library_Issue_Book');

function calculatePendingFees(IssuedDate , LastDate)
{
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const currentDate = new Date();
    const differenceInDays = Math.floor((currentDate - new Date(IssuedDate)) / millisecondsPerDay);
    const daysOverdue = Math.max(0, Math.floor((currentDate - new Date(LastDate)) / millisecondsPerDay));
    const overdueFees = daysOverdue; // 1 rupee per day
    // const totalFees = Math.max(0, differenceInDays - 7) + overdueFees; // Fees after 7 days
    return overdueFees;
}

async function updatePendingFees(prn , fees)
{
    try
    {
        await issue_book.updateMany(
            { PRN: prn },
            { $set: { PendingFees: fees } }
        );

        console.log("Pending fees updated");
    }
    catch(error) {
        console.error("Error updating pending fees:");
    }
}

router.post('/lib_Issue_book' , async (req, res) => {

    const bookID = req.body.bookid;
    const bookname = req.body.bookname;
    const PRN = req.body.studentid;
    const issued_date = req.body.issueddate;
    const submit_date = req.body.collectingdate;
    console.log("BOOK ID : ",bookID , bookname,PRN,issued_date,submit_date);
    // console.log("req is " + req.body);

    const fees = calculatePendingFees(issued_date, submit_date);
    console.log(fees);

    try
    {
        const issue_new_book = await issue_book.insertMany( {BookID : bookID ,BookName : bookname, studentID : PRN , IssuedDate : issued_date ,LastDate : submit_date })
        console.log(issue_new_book);
        
        if(issue_new_book)
        {
            console.log("Document inserted");
            res.json({ success: true })
        }
        else
        {
            console.log("not inserted ");
            res.json({ success: false })
        }
        
    }   
    catch(err) {
        console.log("error !!!");
    }
})

router.post('/get_issued_book_by_PRN' , async (req, res) => {

    // const PRN = req.body.keyType;
    const key = req.body.key;
    console.log("request key : "+key);
    
    try
    {
        const get_list_by_BookID = await issue_book.find({studentID : key });
        const list_by_PRN = get_list_by_BookID.map(item => [item.BookName, item.BookID, item.IssuedDate , item.LastDate , item.fees]);
        console.log(list_by_PRN);
        // console.log(get_list_by_BookID);

        res.json(list_by_PRN);

    }
    catch(err) 
    {
        res.json({ success : false});
    }
    
})

router.post('/get_issued_book_by_BookID' , async (req, res) => {

    // const PRN = req.body.keyType;
    const key = req.body.key;
    console.log("request key : "+key);
    
    try
    {
        const get_list_by_BookID = await issue_book.find({ BookID : key });
        const list_by_BookID = get_list_by_BookID.map(item => [item.BookName, item.studentID, item.IssuedDate , item.LastDate , item.fees]);
        console.log(list_by_BookID);
        // console.log(get_list_by_BookID);

        res.json(list_by_BookID);

    }
    catch(err) 
    {
        res.json({ success : false});
    }
    
})

module.exports = router;