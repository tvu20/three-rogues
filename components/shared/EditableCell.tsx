import { useState } from "react";

import styles from "./EditableCell.module.css";

type EditableCellProps = {
  value: string | number;
  onBlur: (value: string | number) => void;
};

// how this works: render child if not editing, otherwise render input field

const EditableCell = ({ value, onBlur }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // if span is clicked twice, set isEditing to true
  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onBlur(inputValue);
  };

  return (
    <div className={styles.editableCell}>
      {isEditing ? (
        // while editing, changing the input field will update the value
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span onDoubleClick={handleClick}>{value}</span>
      )}
    </div>
  );
};

export default EditableCell;
