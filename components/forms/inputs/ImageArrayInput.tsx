import { Trash } from "@phosphor-icons/react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import styles from "./inputs.module.css";
import TextInput from "./TextInput";
type ImageArrayInputProps = {
  register: UseFormRegister<CharacterDetails>;
  control: Control<CharacterDetails>;
  name: "images";
};

const ImageArrayInput = ({ register, control, name }: ImageArrayInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={styles.classSection}>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.arrayRow}>
          <TextInput
            register={register}
            name={`images.${index}.value`}
            label=""
            placeholder="https://example.com/image.png"
          />
          <button type="button" onClick={() => remove(index)}>
            <Trash size={24} />
          </button>
        </div>
      ))}
      <div style={{ height: "20px" }} />
      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="action-button"
      >
        Add Image URL
      </button>
    </div>
  );
};

export default ImageArrayInput;
