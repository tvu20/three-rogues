import { Path, UseFormRegister } from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";

import styles from "./inputs.module.css";

type TextAreaInputProps = {
  register: UseFormRegister<CharacterDetails>;
  name: Path<CharacterDetails>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  //   fullWidth?: boolean;
  //   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  //   validate?: (value: string) => string | boolean;
};

const TextAreaInput = ({
  register,
  name,
  label,
  placeholder,
  required = false,
  error,
}: TextAreaInputProps) => {
  return (
    <div className={styles.textAreaInput}>
      <label htmlFor={name}>{label}</label>
      <textarea
        cols={300}
        rows={5}
        autoFocus
        id={name}
        style={{ whiteSpace: "pre" }}
        {...register(name, {
          required: required ? "This field is required" : false,
          setValueAs: (v: string) => v,
        })}
        placeholder={placeholder}
        className={error ? styles.error : ""}
      />
    </div>
  );
};

export default TextAreaInput;
