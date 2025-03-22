import { Path, UseFormRegister } from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import styles from "./inputs.module.css";
type CheckboxInputProps = {
  register: UseFormRegister<CharacterDetails>;
  name: Path<CharacterDetails>;
  label: string;
  validate?: (value: boolean) => string | boolean;
};

const CheckboxInput = ({
  register,
  name,
  label,
  validate,
}: CheckboxInputProps) => {
  const inputId = `checkbox-${name}`;

  return (
    <div className={styles.checkboxInput}>
      <input id={inputId} type="checkbox" {...register(name, { validate })} />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
