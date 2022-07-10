import "./button.css";

const Button = (props) => {
  return (
    <button
      type="button"
      className={`btn ${props.rounded ? "rounded" : ""} ${
        props.className ? props.className : ""
      }`}
      onClick={props.onClick}
      style={props.style ? props.style : null}
    >
      {props.children ? props.children : props.buttonText}
    </button>
  );
};

export default Button;
