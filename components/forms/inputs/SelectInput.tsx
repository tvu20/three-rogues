import { Path, UseFormRegister } from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import styles from "./inputs.module.css";
type SelectInputProps = {
  register: UseFormRegister<CharacterDetails>;
  name: Path<CharacterDetails>;
  label: string;
  children: React.ReactNode;
  width?: string;
};

const SelectInput = ({
  register,
  name,
  label,
  children,
  width,
}: SelectInputProps) => {
  return (
    <div className={styles.selectInput}>
      <label htmlFor={name}>{label}</label>
      <select {...register(name)} style={{ width }}>
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
