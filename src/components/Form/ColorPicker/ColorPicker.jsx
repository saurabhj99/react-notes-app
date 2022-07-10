import "./colorPicker.css";

import { colors } from "../../../constants/colors";

const ColorPicker = ({ currentColor, setCurrentColor, className }) => {
  return (
    <div className={`color-picker-container ${className}`}>
      <div className="color-picker-label">Color</div>
      <div className="colors">
      {colors.map((color) => (
        <div
          className={`color-variant ${
            currentColor === color ? "color-active" : null
          }`}
          style={{ backgroundColor: color }}
          onClick={() => setCurrentColor(color)}
        ></div>
      ))}
      </div>
    </div>
  );
};

export default ColorPicker;
