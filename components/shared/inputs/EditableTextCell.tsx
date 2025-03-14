import { useState } from "react";

import styles from "./EditableCell.module.css";

type EditableTextCellProps = {
  value: string;
  onBlur: (value: string) => void;
  defaultValue?: string;
};

// how this works: render child if not editing, otherwise render input field

const EditableTextCell = ({
  value,
  onBlur,
  defaultValue,
}: EditableTextCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // if span is clicked twice, set isEditing to true
  const handleClick = () => {
    setIsEditing(!isEditing);
    setInputValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value || defaultValue || "None");
  };

  const handleBlur = () => {
    setIsEditing(false);
    onBlur(inputValue);
    setInputValue(value);
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

export default EditableTextCell;
