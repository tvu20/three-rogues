import React from "react";

import styles from "./Search.module.css";

type Props = {
  value: string;
  onChange: (string) => void;
  placeholder: string;
  search?: boolean;
  small?: boolean;
  autoFocus?: boolean;
  width?: string;
  marginLeft?: string;
};

const Search: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  search,
  small,
  autoFocus,
  width,
  marginLeft,
}) => {
  return (
    <input
      autoFocus={autoFocus}
      className={`${styles.input} ${search ? styles.search : ""} ${
        small ? styles.small : ""
      }`}
      style={{
        width: width ? width : "",
        marginLeft: marginLeft ? marginLeft : "",
      }}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  );
};

export default Search;
