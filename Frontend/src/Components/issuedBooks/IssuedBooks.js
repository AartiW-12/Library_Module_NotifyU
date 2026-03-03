import React, { useEffect } from 'react'
import './IssuedBooks.css';
import { clientsClaim } from 'workbox-core';
import axios from 'axios';  

export default function IssuedBooks() {

  // getList: [express js]
  const getList = async (keyType, key) => {
    
    let response ;
    // express code goes here...
    if (keyType === "PRN") {
      response = await axios.post('http://localhost:5002/api/get_issued_book_by_PRN', {key});
      // list = [["ABCD EFG", "B-101", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "B-101", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "B-101", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "B-101", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "B-101", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "B-101", "2024-03-07", "2024-03-14", 0]];
      
      // console.log(response.data);
      const list = response.data;
     
      return list;
    }
    else {
      response = await axios.post('http://localhost:5002/api/get_issued_book_by_BookID',{key});
      // list = [["ABCD EFG", "20UAI0XX", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "20UAI0XX", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "20UAI0XX", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "20UAI0XX", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "20UAI0XX", "2024-03-07", "2024-03-14", 0], ["ABCD EFG", "20UAI0XX", "2024-03-07", "2024-03-14", 0]]
      const list = response.data;
      // console.log(typeof(list));
      return list;
    }
    
    
  }

  // issuedBooks: [express js]
  const issuedBooks = async (issuedBook) => {
    let success;

    // express code goes here...
    success = await axios.post('http://localhost:5002/api/lib_Issue_book' , (issuedBook));
    console.log(success.data.success);
    // success = true;

    return success;
  }


  // handleKeyDown:
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleShowList();
    }
  }
  // getSearchKey:
  const getSearchKeyType = (searchKey) => {
    if (searchKey[0] === 'B') {
      return "BookID"
    }
    else if (searchKey[0] === "2") { // Ex.: 20UAI0XX
      return "PRN";
    }
  }
  // handleShowList:
  const handleShowList = async () => {
    var key = document.getElementById("inputPRNorID").value;
    if (key === "") return;

    let list = await getList(getSearchKeyType(key), key);
    console.log("LIST : " + list);
    let target = document.getElementById("issuedListBG");
    target.style.display = "flex";
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }

    for (let i = 0; i < list.length; i++) {
      let parent = document.createElement('div');
      parent.key = i;
      parent.className = "listRecord";

      let child1 = document.createElement('div');
      child1.className = 'labelName';
      child1.innerHTML = "Book name: " + list[i][0];
      let child2 = document.createElement('div');
      child2.className = 'labelPRN';
      child2.innerHTML = "ID: " + list[i][1];
      let child3 = document.createElement('div');
      child3.className = 'labelIssuedDate';
      child3.innerHTML = "Issued date: " + list[i][2];
      let child4 = document.createElement('div');
      child4.className = 'labelCollectingDate';
      child4.innerHTML = "Collecting Date: " + list[i][3];

      parent.appendChild(child1);
      parent.appendChild(child2);
      parent.appendChild(child3);
      parent.appendChild(child4);

      target.appendChild(parent);
    }
  }


  // setTodaysDate:
  const setTodaysDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    document.getElementById("i_issuingdate").value = year + "-" + month + '-' + day;
  }

  

  // setIssueBtn:
  const setIssueBtn = (flg) => {
    if (flg) {
      return (
        <div className="issueBtn" onClick={handleIssueBook}>Submit</div>
      )
    }
    else {
      let child = document.createElement('div');
      child.innerHTML = "Submit";
      child.className = "issueBtn";
      child.onclick = handleIssueBook;
      return child;
    }
  }

  // handleIssueBook:
  const handleIssueBook = () => {
    var bookId = document.getElementById("i_bookid").value;
    var bookName = document.getElementById("i_bookname").value;
    var studentId = document.getElementById("i_studentprn").value;
    var issuedDate = document.getElementById("i_issuingdate").value;
    var collectingDate = document.getElementById("i_collectingdate").value;

    if (!bookId || !bookName || !studentId || !issuedDate || !collectingDate) return;
    else {

      let target = document.getElementById("issueBtnBG");
      if (issuedBooks({ bookid: bookId, bookname: bookName, studentid: studentId, issueddate: issuedDate, collectingdate: collectingDate })) { //express call
        target.removeChild(target.firstChild);
        target.style.color = "rgb(0,255,0)";
        target.innerHTML = `Book ${bookName} with ID: ${bookId} Issued to the ${studentId}`;
        setTimeout(() => {
          target.innerHTML = "";
          target.appendChild(setIssueBtn(false));
        }, 2000);
      }
      else {
        target.removeChild(target.firstChild);
        target.style.color = "rgb(255,0,0)";
        target.innerHTML = `Process Failed.Try Again`;
        setTimeout(() => {
          target.innerHTML = "";
          target.appendChild(setIssueBtn(false));
        }, 2000);
      }

      document.getElementById("i_bookid").value = "";
      document.getElementById("i_bookname").value = "";
      document.getElementById("i_studentprn").value = "";
      document.getElementById("i_collectingdate").value = "";
    }
  }


  useEffect(() => {
    document.getElementById("inputBookDatailBG").style.display = "flex";
    setTodaysDate();
  }, [])

  return (
    <>
      <div className="issuedImgBG">
        <div className="issuedImgCover">

          <div className="issuedContainer">
            <div className="issuedTitle">Issued Books</div>
            <div className="inputPRNorIDBG">
              <input type="text" className="inputPRNorID" id='inputPRNorID' onKeyDown={handleKeyDown} placeholder='Enter PRN or Book-ID' />
              <div className="showListBtn" onClick={handleShowList}>Show</div>
            </div>
            <div className="issuedListBG" id='issuedListBG'>

            </div>
          </div>

          <div className="issueABookContainer">
            <div className="issueABookTitle">Issue Books</div>
            <div className="inputBookDatailBG" id='inputBookDatailBG'>
              <input type="text" placeholder='Enter BookID' className="i_BookID" id='i_bookid' />
              <input type="text" placeholder='Enter Book name' className="i_bookName" id='i_bookname' />
              <input type="text" placeholder='Enter StudentID (PRN)' className="i_studentPRN" id='i_studentprn' />
              <input type="text" readOnly className="i_issuingDate" id='i_issuingdate' />
              <input type="date" placeholder='Select Due Date' className="i_bookCollectingDate" id='i_collectingdate' />
            </div>
            <div className="issueBtnBG" id='issueBtnBG'>
              {setIssueBtn(true)}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
