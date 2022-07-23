import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Note from "./components/Note/Note";
import Form from "./components/Form/Form";
import Menubar from "./components/MenuBar/MenuBar";

import { colorsMap } from "./constants/colors";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./utils/localStorageHelper";

import "./app.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedNotes = getLocalStorage("notes");
    if (storedNotes && storedNotes.length) {
      const parsedData = JSON.parse(storedNotes);
      setNotes(parsedData);
    } else {
      removeLocalStorage("notes");
    }
  }, []);

  useEffect(() => {
    handleModalScroll(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    setLocalStorage("notes", notes);
  }, [notes]);

  const handleModalScroll = (isModalOpen) => {
    const body = document.body;
    if (body) {
      body.style.overflowY = isModalOpen ? "hidden" : "auto";
    }
  };

  const onButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const saveNotes = (newNote, editNote = false) => {
    if (!Object.keys(newNote).length) {
      return;
    }
    if (!editNote) {
      setNotes([...notes, newNote]);
    } else {
      const updatedNotes = [
        ...notes.filter((note) => note.id !== newNote.id),
        newNote,
      ];
      setNotes(updatedNotes);
      setNoteToEdit(null);
    }
  };

  const handleNotesAction = (action, noteId) => {
    switch (action) {
      case "edit":
        const noteToUpdate = notes.filter((note) => note.id === noteId);
        setNoteToEdit(noteToUpdate[0]);
        setIsModalOpen(true);
        break;
      case "delete":
        const filteredNotes = notes.filter((note) => note.id !== noteId);
        setNotes(filteredNotes);
        setLocalStorage("notes", filteredNotes);
        break;
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div>
        <Menubar
          onButtonClick={onButtonClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {isModalOpen && (
          <Form
            notes={notes}
            saveNotes={saveNotes}
            setIsModalOpen={setIsModalOpen}
            noteToEdit={noteToEdit}
            setNoteToEdit={setNoteToEdit}
          />
        )}
        {notes && notes.length ? (
          <div className="notes-container">
            {notes
              .filter((note) => note.title.match(new RegExp(searchTerm, "i")))
              .map(({ id, title, note, color, createdOn }, index) => (
                <Note
                  key={index}
                  bgColor={colorsMap[color]}
                  title={title}
                  description={note}
                  createdOn={createdOn}
                  onAction={(action) => handleNotesAction(action, id)}
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
