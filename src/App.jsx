import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Note from "./components/Note/Note";
import Button from "./components/Button/Button";
import Form from "./components/Form/Form";

import { colorsMap } from "./constants/colors";
import { setLocalStorage, getLocalStorage } from "./utils/localStorageHelper";

import "./app.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = getLocalStorage("notes");
    if (storedNotes && storedNotes.length) {
        const parsedData = JSON.parse(storedNotes);
        setNotes(parsedData);
    } 
  }, []);

  const onButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const saveNotes = (newNote) => {
    if (!Object.keys(newNote).length) {
      return;
    }
    setNotes([...notes, newNote]);
    setLocalStorage("notes", [...notes, newNote])
  }

  return (
    <div className="main-container">
      <Header />
      <div>
        <Button onClick={onButtonClick} rounded={true}>
          <span> Create </span>
          <i className="ri-pencil-fill"></i>
        </Button>

        {isModalOpen && (
          <Form
            notes={notes}
            saveNotes={saveNotes}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {notes && notes.length ? (
          <div className="notes-container">
            {notes.map(({ title, note, color }, index) => (
              <Note
                key={index}
                bgColor={colorsMap[color]}
                title={title}
                description={note}
              />
            ))}
          </div>
        ) : (
          <div>You don't have any notes yet</div>
        )}
      </div>
    </div>
  );
};

export default App;
