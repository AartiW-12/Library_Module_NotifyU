import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IssuedBooks.css";

export default function IssuedBooks() {
  const [searchKey, setSearchKey] = useState("");
  const [issuedList, setIssuedList] = useState([]);

  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [collectingDate, setCollectingDate] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setIssuedDate(today);
  }, []);

  const getSearchKeyType = (key) => {
    if (!key) return null;
    if (key.startsWith("B")) return "BookID";
    if (key.startsWith("2")) return "PRN";
    return null;
  };

  const handleShowList = async () => {
    if (!searchKey) return;
    try {
      const type = getSearchKeyType(searchKey);
      const url =
        type === "PRN"
          ? "http://localhost:5002/api/get_issued_book_by_PRN"
          : "http://localhost:5002/api/get_issued_book_by_BookID";

      const response = await axios.post(url, { key: searchKey });
      setIssuedList(response.data || []);
    } catch (error) {
      console.error("Error fetching issued books:", error);
      setIssuedList([]);
    }
  };

  const handleIssueBook = async () => {
    if (!bookId || !bookName || !studentId || !issuedDate || !collectingDate) {
      setMessageColor("red");
      setMessage("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5002/api/lib_Issue_book", {
        bookid: bookId,
        bookname: bookName,
        studentid: studentId,
        issueddate: issuedDate,
        collectingdate: collectingDate,
      });

      if (response.data.success) {
        setMessageColor("green");
        setMessage(`Book ${bookName} issued successfully!`);
        setBookId("");
        setBookName("");
        setStudentId("");
        setCollectingDate("");
        // refresh list if needed
        if (searchKey === bookId || searchKey === studentId) handleShowList();
      } else {
        setMessageColor("red");
        setMessage("Process Failed. Try Again.");
      }
    } catch (error) {
      setMessageColor("red");
      setMessage("Server Error!");
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleShowList();
  };

  return (
    <div className="issuedImgBG">
      <div className="issuedImgCover">
        {/* 🔹 Search Section */}
        <div className="issuedContainer">
          <div className="issuedTitle">Issued Books</div>
          <div className="inputPRNorIDBG">
            <input
              type="text"
              className="inputPRNorID"
              placeholder="Enter PRN or Book-ID"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="showListBtn" onClick={handleShowList}>
              Show
            </div>
          </div>
          <div
            className="issuedListBG"
            style={{ display: issuedList.length > 0 ? "flex" : "none" }}
          >
            {issuedList.length === 0 ? (
              <p style={{ color: "white" }}>No Records Found</p>
            ) : (
              issuedList.map((item, index) => (
                <div key={index} className="listRecord">
                  <div>Book Name: {item.BookName}</div>
                  <div>ID: {item.BookID}</div>
                  <div>Student ID: {item.studentID}</div>
                  <div>Issued Date: {new Date(item.IssuedDate).toLocaleDateString()}</div>
                  <div>Collecting Date: {new Date(item.LastDate).toLocaleDateString()}</div>
                  <div>Fees: {item.fees}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 🔹 Issue Book Section */}
        <div className="issueABookContainer">
          <div className="issueABookTitle">Issue Book</div>
          <div className="inputBookDatailBG" style={{ display: "flex" }}>
            <input
              type="text"
              className="i_BookID"
              placeholder="Enter BookID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
            <input
              type="text"
              className="i_bookName"
              placeholder="Enter Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <input
              type="text"
              className="i_studentPRN"
              placeholder="Enter StudentID (PRN)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <input
              type="date"
              className="i_issuingDate"
              value={issuedDate}
              readOnly
            />
            <input
              type="date"
              className="i_bookCollectingDate"
              value={collectingDate}
              onChange={(e) => setCollectingDate(e.target.value)}
            />
          </div>
          <div className="issueBtn" onClick={handleIssueBook}>
            Submit
          </div>
          {message && (
            <div style={{ color: messageColor, marginTop: "10px" }}>{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}