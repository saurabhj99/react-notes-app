import Button from "../Button/Button";
import "./menubar.css";

const Menubar = (props) => {
  const onSearchChange = (e) => {
    props.setSearchText(e.target.value.trim());
  };

  return (
    <div className="menubar-container">
      <Button onClick={props.onButtonClick} rounded={true}>
        <span> Create </span>
        <i className="ri-pencil-fill"></i>
      </Button>
      {props.notes && props.notes.length ? (
        <div className="search-bar">
          <input
            type="text"
            value={props.searchText}
            placeholder="Search by title"
            onChange={onSearchChange}
          />
          <i className="ri-search-line"></i>
        </div>
      ) : null}
    </div>
  );
};

export default Menubar;
