import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./inputs.module.css";

type MultiSelectInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  options: string[];
  width?: string;
  required?: boolean;
  error?: string;
};

const MultiSelectInput = <T extends FieldValues>({
  register,
  name,
  label,
  options,
  width,
  required,
  error,
}: MultiSelectInputProps<T>) => {
  return (
    <div className={styles.multiSelectInput}>
      <label htmlFor={name}>{label}</label>
      <select
        multiple
        {...register(name, {
          required: required ? "This field is required" : false,
        })}
        style={{ width }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {<span className={styles.errorMessage}>{error || " "}</span>}
    </div>
  );
};

export default MultiSelectInput;
