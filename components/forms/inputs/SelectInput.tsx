import { Path, UseFormRegister } from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import styles from "./inputs.module.css";
type SelectInputProps = {
  register: UseFormRegister<CharacterDetails>;
  name: Path<CharacterDetails>;
  label: string;
  children: React.ReactNode;
  width?: string;
  required?: boolean;
  error?: string;
};

const SelectInput = ({
  register,
  name,
  label,
  children,
  width,
  required,
  error,
}: SelectInputProps) => {
  return (
    <div className={styles.selectInput}>
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name, {
          required: required ? "This field is required" : false,
        })}
        style={{ width }}
      >
        {children}
      </select>
      {<span className={styles.errorMessage}>{error || " "}</span>}
    </div>
  );
};

export default SelectInput;
