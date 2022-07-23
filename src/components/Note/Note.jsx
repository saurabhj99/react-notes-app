import formatTime from "../../utils/formatTime";
import Button from "../Button/Button";
import "./note.css";

const Note = (props) => {
  return (
    <div className={`note ${props.bgColor}`}>
      {props.title ? (
        <div className="note-title">{props.title}</div>
      ) : (
        <div className="no-title"></div>
      )}
      <p className="note-description">{props.description}</p>
      <div className="note-action-overlay">
        <div className="note-created-on">{formatTime(props.createdOn)}</div>
        <div className="note-actions">
          <Button
            className="note-actions-btn primary"
            onClick={() => props.onAction("edit")}
          >
            <i className="ri-edit-line"></i>
          </Button>
          <Button
            className="note-actions-btn danger"
            onClick={() => props.onAction("delete")}
          >
            <i className="ri-delete-bin-fill"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
