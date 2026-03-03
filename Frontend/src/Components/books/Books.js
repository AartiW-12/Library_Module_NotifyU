import React, { useEffect, useRef, useState } from 'react';
import './Books.css';
import axios from 'axios';

export default function Books() {

  const [response, setresponse] = useState([]);

  // 🔹 Get All Books
  const getAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/get_books");
      console.log("Books fetched:", res.data);
      const books = Array.isArray(res.data) ? res.data : res.data.data;
      return books.map(book => [book.bookid, book.name, book.author]);
    } catch (err) {
      console.error("Error fetching books:", err);
      return [];
    }
  }

  // 🔹 Reusable fetchBooks
  const fetchBooks = async () => {
    const books = await getAllBooks();
    setresponse(books);
  };

  useEffect(() => {
    fetchBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Add a Book
  const addNewBook = async (book) => {
    try {
      const res = await axios.post("http://localhost:5002/api/add_single_book", { book });
      return res.data.success;
    } catch (err) {
      console.error("Add Book Error:", err);
      return false;
    }
  }

  // 🔹 Upload Books File
  const addNewRack = async (booksFile) => {
    try {
      const formData = new FormData();
      formData.append("booksFile", booksFile, booksFile.name);
      const res = await axios.post("http://localhost:5002/api/add_book_rack", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.success;
    } catch (err) {
      console.error("Add Rack Error:", err);
      return false;
    }
  }

  // 🔹 Remove Book
  const removeBook = async (bookID, bookName) => {
    try {
      if (!bookID && !bookName) return false;
      const res = await axios.delete("http://localhost:5002/api/removebook", {
        data: { bookid: bookID, name: bookName }
      });
      return res.data.success;
    } catch (err) {
      console.error("Remove book error:", err);
      return false;
    }
  };

  const addABook = useRef(null);
  const addMultipleBooks = useRef(null);

  const handleABook = () => {
    if (addMultipleBooks.current) addMultipleBooks.current.style.display = "none";
    if (addABook.current) addABook.current.style.display = "flex";
  }

  const handleBooks = () => {
    if (addABook.current) addABook.current.style.display = "none";
    if (addMultipleBooks.current) addMultipleBooks.current.style.display = "flex";
  }

  const setSubmitBtn = (flg) => {
    if (flg) {
      const btn = document.createElement("div");
      btn.className = "submitSingleBook";
      btn.onclick = handleSingleBookSumbit;
      btn.innerHTML = "Submit";
      return btn;
    } else {
      return <div className="submitSingleBook" onClick={handleSingleBookSumbit}>Submit</div>;
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSingleBookSumbit();
  }

  // 🔹 Handle Single Book Submit
  const handleSingleBookSumbit = async () => {
    const name = document.getElementById("bookname").value;
    const author = document.getElementById("author").value;
    const bookid = document.getElementById("bookid").value;
    const topic1 = document.getElementById("topic1").value;
    const topic2 = document.getElementById("topic2").value;
    const topic3 = document.getElementById("topic3").value;

    if (!name || !author || !bookid || !topic1 || !topic2 || !topic3) return;

    const newBook = { bookid, name, author, topic1, topic2, topic3 };
    const success = await addNewBook(newBook);

    const target = document.getElementById("submitSingleBookBG");
    while (target.firstChild) target.removeChild(target.firstChild);

    if (success) {
      target.style.color = "rgb(4, 255, 0)";
      target.innerHTML = `Book ${name} added successfully!`;
      await fetchBooks(); // 🔹 Refresh list
    } else {
      target.style.color = "rgb(255, 0, 0)";
      target.innerHTML = `Failed to add Book ${name}.`;
    }

    setTimeout(() => {
      target.innerHTML = "";
      target.appendChild(setSubmitBtn(true));
    }, 2000);

    document.getElementById("bookname").value = "";
    document.getElementById("author").value = "";
    document.getElementById("bookid").value = "";
    document.getElementById("topic1").value = "";
    document.getElementById("topic2").value = "";
    document.getElementById("topic3").value = "";
  }

  // 🔹 Book file state
  let file = undefined;
  const bookFileonChange = (e) => { file = e.target.files[0] || undefined; }

  const setFileSubmitBtn = (flg) => {
    if (flg) {
      const btn = document.createElement("div");
      btn.className = "submitBookFile";
      btn.onclick = handleBookFileSumbit;
      btn.innerHTML = "Submit";
      return btn;
    } else {
      return <div className="submitBookFile" onClick={handleBookFileSumbit}>Submit</div>;
    }
  }

  const handleBookFileSumbit = async () => {
    if (!file) return;

    const success = await addNewRack(file);
    const target = document.getElementById("submitBooksFileBG");
    while (target.firstChild) target.removeChild(target.firstChild);

    if (success) {
      target.style.color = "rgb(0, 255, 0)";
      target.innerHTML = `File ${file.name} uploaded successfully!`;
      await fetchBooks(); // 🔹 Refresh list
    } else {
      target.style.color = "rgb(255, 0, 0)";
      target.innerHTML = `Failed to upload File ${file.name}`;
    }

    setTimeout(() => {
      target.innerHTML = "";
      target.appendChild(setFileSubmitBtn(true));
    }, 2000);

    file = undefined;
    const inputMulti = document.getElementById("inputMultiBG");
    inputMulti.innerHTML = "";
    inputMulti.appendChild(setAddMultipleBooks(false));
  }

  const setAddMultipleBooks = (flg) => {
    if (flg) return <input type='file' className='inputBooksFile' onChange={bookFileonChange} />;
    const child = document.createElement("input");
    child.type = "file";
    child.className = "inputBooksFile";
    child.onchange = bookFileonChange;
    return child;
  }

  const setRemoveSubmit = (flg) => {
    if (flg) {
      const child = document.createElement("div");
      child.innerHTML = "Submit";
      child.className = "removeSubmit";
      child.onclick = handleRemoveSubmit;
      return child;
    } else return <div className="removeSubmit" onClick={handleRemoveSubmit}>Submit</div>;
  }

  const handleemoveKeyDown = (e) => { if (e.key === "Enter") handleRemoveSubmit(); }

  const handleRemoveSubmit = async () => {
    let bookID = document.getElementById("removeByID").value;

    if (!bookID) return;

    const success = await removeBook(bookID);

    const target = document.getElementById("submitRemoveBookBG");
    target.innerHTML = success
      ? `Book with ID: ${bookID} removed successfully!`
      : `Failed to remove book with ID: ${bookID}`;

    if (success) await fetchBooks(); // 🔹 Refresh list

    setTimeout(() => {
      target.innerHTML = `<div class='removeSubmit' onClick=${handleRemoveSubmit}>Submit</div>`;
    }, 2000);
  };

  return (
    <div className="booksParent">
      <div className="booksContainer">
        <div className="booksWorkContainer"></div>

        {/* Add Book Section */}
        <div className="addBookContainer">
          <div className="addBookTitle">Add New Books</div>
          <div className="addBookOptionBG">
            <span className="addBookbtn" onClick={handleABook}>Add a Book</span>
            <span className="addBooksbtn" onClick={handleBooks}>Add Books</span>
          </div>

          <div ref={addABook} className="addSingleBook" id='addSingleBook'>
            <div className="singleBookTitle">Add New One</div>
            <input onKeyDown={handleKeyDown} id='bookname' className="bookName" placeholder='name/title...' />
            <input onKeyDown={handleKeyDown} id='author' className="Author" placeholder='author...' />
            <input onKeyDown={handleKeyDown} id='bookid' className="bookID" placeholder='book ID...' />
            <input onKeyDown={handleKeyDown} id='topic1' className="topic1" placeholder='primary topic...(Java)' />
            <input onKeyDown={handleKeyDown} id='topic2' className="topic2" placeholder='secondary topic...(Programming Lang.)' />
            <input onKeyDown={handleKeyDown} id='topic3' className="topic3" placeholder='ternary topic...(IT)' />
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

        {/* Remove Book Section */}
        <div className="removeBookContainer">
          <div className="removeBookTitle">Remove Book</div>
          <div className="removeBookInputBG">
            <input type="text" id='removeByID' className="removeByID" onKeyDown={handleemoveKeyDown} placeholder='Enter Book ID' />
            <div className="submitRemoveBookBG" id='submitRemoveBookBG'>
              {setRemoveSubmit(false)}
            </div>
          </div>
        </div>

        {/* Show Books */}
        <div className="showAllBooksContainer">
          <div className="showBooksTitle">Books</div>
          <div className="tableHeaderBG">
            <div className="headerBookID">ID</div>
            <div className="headerBookName">Name</div>
            <div className="headerBookAuthor">Author</div>
          </div>
          <div className="tableContainer">
            <table>
              <tbody>
                {response.map((record, idx) => (
                  <tr key={idx} className='datarow'>
                    <td className='dataID'>{record[0]}</td>
                    <td className='dataName'>{record[1]}</td>
                    <td className='dataAuthor'>{record[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}