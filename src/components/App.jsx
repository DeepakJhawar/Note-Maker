import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const setArrayInLocalStorage = (array) => {
    localStorage.setItem("notes", JSON.stringify(array));
  };

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("notes"));
    if (storedArray) {
      setNotes(storedArray);
    }
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      const newArray = [...prevNotes, newNote];
      setArrayInLocalStorage(newArray);
      return newArray;
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      const newArray = prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
      setArrayInLocalStorage(newArray);
      return newArray;
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="grid-container">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <div style={{ height: "100px", display: "block" }}></div> 
      <Footer />
    </div>
  );
}

export default App;
