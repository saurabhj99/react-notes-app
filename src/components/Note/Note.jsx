import "./note.css"

const Note = (props) => {
  return <div className={`note ${props.bgColor}`}>
    <div className="note-title">{props.title}</div>
    <div className="note-description">{props.description}</div>
  </div>;
};

export default Note;
