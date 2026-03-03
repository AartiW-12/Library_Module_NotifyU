import React, { useEffect, useRef, useState } from 'react'
import './Books.css'
import axios from 'axios';

export default function Books() {

  // Add a Book [Express JS]
  const addNewBook = async (book) => {
    let response;

    // express code goes here...
    response = await axios.post("http://localhost:5002/api/add_single_book" , { book })

    console.log(response.data.success);

    return response.data.success;
  }
  // Upload a Books File: [Express JS]
  const addNewRack = async (booksFile) => {
    console.log("file is : ",booksFile);
    let Response ;

    // express code goes here...
    Response = await axios.post("http://localhost:5002/api/add_book_rack" , booksFile  );
    
    console.log(Response);
    console.log(Response.data.success);

    return Response.data.success;
  }

  // removeBook: [Express JS]
  const removeBook = async(bookID, bookName) => {
    let response;
    // express code goes here...
    response = await axios.post("http://localhost:5002/api/remove_book" , { bookID, bookName });
    console.log("Response : " + response.success);
    console.log(typeof(response));
    console.log(`deleting a book with ID: ${bookID} and Name: ${bookName}`);
  }

  // getAllBooks: [Express JS]
  const getAllBooks =  async () => {
    let response;
    // // express code goes here...
    response = await axios.post("http://localhost:5002/api/get_books");
      // response = [["B-000", "Book one", "Author one"], ["B-001", "Book two", "Author two"], ["B-003", "Book three", "Author three"], ["B-004", "Book four", "Author four"], ["B-005", "Book five", "Author five"], ["B-006", "Book six", "Author six"], ["B-007", "Book seven", "Author seven"], ["B-008", "`Book seven", "Author `seven"], ["B-009", "Book nine", "Author nine"], ["B-010", "Book ten", "Author ten"], ["B-011", "Book eleven", "Author eleven"], ["B-012", "Book one twelve", "Author twelve"], ["B-013", "Book thirteen", "Author thirteen"], ["B-014", "Book fourteen", "Author fourteen"]];
    console.log("Response " , response.data);
    const bookList = response.data;
    console.log(bookList);
    return bookList;
  }



  const addABook = useRef(null);
  // handleABooks:
  const handleABook = (e) => {
    const targetOther = addMultipleBooks.current;
    targetOther.style.display = "none";
    const targetmain = addABook.current
    targetmain.style.display = "flex";
  }

  const addMultipleBooks = useRef(null);
  // handleBooks:
  const handleBooks = (e) => {
    const targetOther = addABook.current;
    targetOther.style.display = "none";
    const targetmain = addMultipleBooks.current
    targetmain.style.display = "flex";

  }

  // setSubmitBtn:
  const setSubmitBtn = (flg) => {
    if (flg) {
      var btn = document.createElement("div");
      btn.className = "submitSingleBook";
      btn.onclick = handleSingleBookSumbit;
      btn.innerHTML = "Submit";
      return btn;
    }
    else {
      return (
        <div className="submitSingleBook" onClick={handleSingleBookSumbit}>Submit</div>
      )
    }
  }

  // handleKeyDown:
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSingleBookSumbit();
    }
  }

  // handleSingleBookSumbit:
  const handleSingleBookSumbit = (e) => {

    var name = document.getElementById("bookname").value;
    var author = document.getElementById("author").value;
    var bookid = document.getElementById("bookid").value;
    var topic1 = document.getElementById("topic1").value;
    var topic2 = document.getElementById("topic2").value;
    var topic3 = document.getElementById("topic3").value;

    if (name === "" || author === "" || bookid === "" || topic1 === "" || topic2 === "" || topic3 === "") return;
    else {
      document.getElementById("bookname").value = "";
      document.getElementById("author").value = "";
      document.getElementById("bookid").value = "";
      document.getElementById("topic1").value = "";
      document.getElementById("topic2").value = "";
      document.getElementById("topic3").value = "";
    }

    let newBook = {
      bookid: bookid,
      name: name,
      author: author,
      topic1: topic1,
      topic2: topic2,
      topic3: topic3,
    }

    let success = addNewBook(newBook); // Express Js call.

    const target = document.getElementById("submitSingleBookBG");
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }

    if (success) {
      target.style.color = "rgb(4, 255, 0)";
      target.innerHTML = `Book ${name} added SuccessFully!`;
      setTimeout(() => {
        target.innerHTML = "";
        target.appendChild(setSubmitBtn(true));
      }, 2000);
    }
    else{
      target.style.color = "rgb(255, 0, 0)";
      target.innerHTML = `Failed to add Book ${name}. Try Again`;
      setTimeout(() => {
        target.innerHTML = "";
        target.appendChild(setSubmitBtn(true));
      }, 2000);
    }


  }

  // bookFileonChange:
  let file = undefined;
  // let filePicked = false;
  const bookFileonChange = (e) => {
    if (e.target.files[0] !== undefined) file = e.target.files[0];
    else file = undefined;
  }

  // setFileSubmitBtn:
  const setFileSubmitBtn = (flg) => {
    if (flg) {
      var btn = document.createElement("div");
      btn.className = "submitBookFile";
      btn.onclick = handleBookFileSumbit;
      btn.innerHTML = "Submit";
      return btn;
    }
    else {
      return (
        <div className="submitBookFile" onClick={handleBookFileSumbit}>Submit</div>
      )
    }
  }

  // handleBookFileSumbit:
  const handleBookFileSumbit = () => {
    if (file === undefined)return;
    else {

      let success = addNewRack(file); // express js call.

      const target = document.getElementById("submitBooksFileBG");
      while (target.firstChild) {
        target.removeChild(target.firstChild);
      }

      if(success){
        target.style.color = "rgb(0, 255, 0)";
        target.innerHTML = `File ${file.name} uploaded SuccessFully!`; 
        setTimeout(() => {
          target.innerHTML = "";
          target.appendChild(setFileSubmitBtn(true));
        }, 2000);
      }
      else{
        target.style.color = "rgb(255, 0, 0)";
        target.innerHTML = `Failed to uplod File ${file.name}`; 
        setTimeout(() => {
          target.innerHTML = "";
          target.appendChild(setFileSubmitBtn(true));
        }, 2000);
      }
      file = undefined;
    }

    var target = document.getElementById("inputMultiBG");
    target.removeChild(target.firstChild);
    target.appendChild(setAddMultipleBooks(false));
  }

  // setAddMultipleBooks:
  const setAddMultipleBooks = (flg) => {
    if (flg) {
      return (
        <input type='file' className='inputBooksFile' onChange={bookFileonChange}></input>
      )
    }
    else {
      const child = document.createElement("input");
      child.type = "file";
      child.className = "inputBooksFile"
      child.onchange = bookFileonChange;
      return child;
    }
  }



  // setRemoveSubmit:
  const setRemoveSubmit = (flg) => {
    if (flg) {
      let child = document.createElement("div");
      child.innerHTML = "Submit"
      child.className = "removeSubmit";
      child.onclick = handleRemoveSubmit;
      return child;
    }
    else {
      return (
        <div className='removeSubmit' onClick={handleRemoveSubmit} >Submit</div>
      )
    }
  }

  // handleemoveKeyDown:
  const handleemoveKeyDown = (e) => {
    if (e.key === "Enter") handleRemoveSubmit();
  }

  // handleRemoveSubmit:
  const handleRemoveSubmit = () => {
    let bookiD = document.getElementById("removeByID");
    let bookName = document.getElementById("removeByName");
    if (bookiD.value || bookName.value) {
      let target = document.getElementById("submitRemoveBookBG");
      target.removeChild(target.firstChild);
      removeBook(bookiD.value, bookName.value) // Express JS Call.
      target.innerHTML = `Book with Name: ${bookName.value} ID: ${bookiD.value} removed Successfully!`
      setTimeout(() => {
        target.innerHTML = "";
        target.appendChild(setRemoveSubmit(true))
      }, 2000);
    }
  }


  const [response, setresponse] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const books = await getAllBooks();
      setresponse(books);
    };

    fetchData();
    // setresponse(getAllBooks);
  }, [])

  return (
    <div>
      <>
        <div className="booksParent">
          <div className="booksContainer" >
            <div className="booksWorkContainer">

            </div>

            <div className="addBookContainer">
              <div className="addBookTitle">Add New Books</div>
              <div className="addBookOptionBG">
                <span className="addBookbtn" onClick={handleABook} >Add a Book</span>
                <span className="addBooksbtn" onClick={handleBooks} >Add Books</span>
              </div>
              <div ref={addABook} className="addSingleBook" id='addSingleBook'>
                <div className="singleBookTitle">Add New One</div>
                <input onKeyDown={handleKeyDown} id='bookname' className="bookName" placeholder='name/title...'></input>
                <input onKeyDown={handleKeyDown} id='author' className="Author" placeholder='author...'></input>
                <input onKeyDown={handleKeyDown} id='bookid' className="bookID" placeholder='book ID...'></input>
                <input onKeyDown={handleKeyDown} id='topic1' className="topic1" placeholder='primary topic...(Java)'></input>
                <input onKeyDown={handleKeyDown} id='topic2' className="topic2" placeholder='secondary topic...(Programming Lang.)'></input>
                <input onKeyDown={handleKeyDown} id='topic3' className="topic3" placeholder='ternary topic...(IT)'></input>
                <div className="submitSingleBookBG" id='submitSingleBookBG'>
                  {setSubmitBtn(false)}
                </div>
              </div>

              <div ref={addMultipleBooks} className="addMultipleBooks" id='addMultipleBooks'>
                <div className="multipleBookTitle">Feed a Rack</div>
                <div className="inputMultiBG" id="inputMultiBG">
                  {setAddMultipleBooks(true)}
                </div>
                <div className="submitBooksFileBG" id='submitBooksFileBG'>
                  {setFileSubmitBtn(false)}
                </div>
              </div>
            </div>

            <div className="removeBookContainer">
              <div className="removeBookTitle">Remove Book</div>
              <div className="removeBookInputBG">
                <input type="text" id='removeByID' className="removeByID" onKeyDown={handleemoveKeyDown} placeholder='Enter Book ID' />
                <div className="or">OR</div>
                <input type="text" id='removeByName' className="removeByName" onKeyDown={handleemoveKeyDown} placeholder='Enter Book Name' />
                <div className="submitRemoveBookBG" id='submitRemoveBookBG'>
                  {setRemoveSubmit(false)}
                </div>
              </div>
            </div>

            <div className="showAllBooksContainer">
              <div className="showBooksTitle">
                Books
              </div>
              <div className="tableHeaderBG">
                <div className="headerBookID">ID</div>
                <div className="headerBookName">Name</div>
                <div className="headerBookAuthor">Author</div>
              </div>

              <div className="tableContainer">
                <table>
                  <tbody>
                    {
                      response.map((record, idx) => (
                        <tr key={idx} className='datarow'>
                          <td className='dataID'>{record[0]}</td>
                          <td className='dataName'>{record[1]}</td>
                          <td className='dataAuthor'>{record[2]}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
