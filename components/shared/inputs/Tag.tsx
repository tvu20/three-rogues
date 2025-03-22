import React, { useEffect, useState } from "react";

type Props = {
  name: string;
  disabled?: boolean;
  filled?: boolean;
  addItem: (text: string) => void;
  removeItem: (text: string) => void;
  includes?: boolean;
};

const Tag: React.FC<Props> = ({
  name,
  disabled,
  filled,
  addItem,
  removeItem,
  includes,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (includes && selected !== includes) {
      setSelected(includes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includes]);

  const clicked = () => {
    if (disabled) return;

    if (selected) {
      removeItem(name);
    } else {
      addItem(name);
    }

    setSelected((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      className={`action-button ${
        selected || filled ? "highlighted-action-button" : ""
      }`}
      onClick={clicked}
      disabled={disabled}
    >
      <p>{name}</p>
    </button>
  );
};

export default Tag;
