import { useState } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import Button from "../Button/Button";
import "./form.css";

const Form = (props) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [error, setError] = useState({})

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
    let errorField = {}
    if (!obj.note.trim().length) {
      errorField["note"] = "Notes cannot be empty"
    }
    if (!obj.color) {
      errorField["color"] = "Please pick a color"
    }
    setError(errorField);
    return errorField;
  }

  const onButtonClick = (e) => {
    let noteObj = {title , note, color:currentColor};
    let errors = validateInput(noteObj);
    if (Object.keys(errors).length) {
      return ;
    }
    setError({});
    props.saveNotes({ title, note, color: currentColor });
    props.setIsModalOpen(false);
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <div className="close-icon"
        onClick={() => props.setIsModalOpen(false)}>
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
        <div className="error-msg">{error && error["color"] ? error["color"]: null}</div>
        <div className="note-description-container">
          <textarea
            value={note}
            name="note"
            placeholder="Enter your notes here"
            onChange={onChangeHandler}
          />
        </div>
        <div className="error-msg">{error && error["note"] ? error["note"]: null}</div>
        <Button rounded={true} className="add-btn" onClick={onButtonClick}>
          <span>Add</span>
          <i className="ri-add-line"></i>
        </Button>
      </div>
    </div>
  );
};

export default Form;
