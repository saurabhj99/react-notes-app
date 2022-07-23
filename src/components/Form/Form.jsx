import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import Button from "../Button/Button";
import "./form.css";

const Form = (props) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (props.noteToEdit && Object.keys(props.noteToEdit).length) {
      const editTitle = props.noteToEdit?.title || "";
      const editNote = props.noteToEdit?.note || "";
      const editColor = props.noteToEdit?.color || "";
      setTitle(editTitle);
      setNote(editNote);
      setCurrentColor(editColor);
    }
  }, [props.noteToEdit]);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "note") {
      setNote(value);
    }
  };

  const validateInput = (obj) => {
    let errorField = {};
    if (!obj.note.trim().length) {
      errorField["note"] = "Notes cannot be empty";
    }
    if (!obj.color) {
      errorField["color"] = "Please pick a color";
    }
    setError(errorField);
    return errorField;
  };

  const onButtonClick = () => {
    let noteObj = {
      id:
        props.noteToEdit?.id ||
        Math.floor(new Date().getTime() / 1000),
      title,
      note,
      color: currentColor,
      createdOn: new Date(),
    };
    let errors = validateInput(noteObj);
    if (Object.keys(errors).length) {
      return;
    }
    setError({});
    // case for the note to be edited
    if (props.noteToEdit && Object.keys(props.noteToEdit).length) {
      props.saveNotes(noteObj, true);
    } else {
      props.saveNotes(noteObj);
    }
    props.setIsModalOpen(false);
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <div className="close-icon" onClick={() => props.setIsModalOpen(false)}>
          <i className="ri-close-line"></i>
        </div>
        <div className="note-title-container">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={onChangeHandler}
          />
        </div>
        <ColorPicker
          className="note-colors-container"
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />
        <div className="error-msg">
          {error && error["color"] ? error["color"] : null}
        </div>
        <div className="note-description-container">
          <textarea
            value={note}
            name="note"
            placeholder="Enter your notes here"
            onChange={onChangeHandler}
          />
        </div>
        <div className="error-msg">
          {error && error["note"] ? error["note"] : null}
        </div>
        <Button rounded={true} className="add-btn" onClick={onButtonClick}>
          <span>{props.noteToEdit ? "Update" : "Add"}</span>
          {!props.noteToEdit && <i className="ri-add-line"></i>}
        </Button>
      </div>
    </div>
  );
};

export default Form;
