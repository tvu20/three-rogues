import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./inputs.module.css";
type CheckboxInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  validate?: (value: boolean) => string | boolean;
  marginTop?: string;
};

const CheckboxInput = <T extends FieldValues>({
  register,
  name,
  label,
  validate,
  marginTop,
}: CheckboxInputProps<T>) => {
  const inputId = `checkbox-${name}`;

  return (
    <div className={styles.checkboxInput} style={{ marginTop }}>
      <input id={inputId} type="checkbox" {...register(name, { validate })} />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
