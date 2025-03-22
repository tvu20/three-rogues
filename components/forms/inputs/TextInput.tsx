import { UseFormRegister } from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import styles from "./inputs.module.css";

type TextInputProps = {
  register: UseFormRegister<CharacterDetails>;
  name: keyof CharacterDetails;
  label: string;
  width?: string;
  placeholder?: string;
  type?: "text" | "number";
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  register,
  name,
  label,
  width,
  placeholder,
  type = "text",
  required = false,
  error,
  fullWidth = false,
  onChange,
}: TextInputProps) => {
  return (
    <div
      className={styles.textInput}
      style={{ width: fullWidth ? "100%" : "" }}
    >
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        {...register(name, {
          required: required ? "This field is required" : false,
        })}
        style={{ width: fullWidth ? "100%" : width }}
        placeholder={placeholder}
        className={error ? styles.error : ""}
        onChange={onChange}
      />
      {<span className={styles.errorMessage}>{error || " "}</span>}
    </div>
  );
};

export default TextInput;
