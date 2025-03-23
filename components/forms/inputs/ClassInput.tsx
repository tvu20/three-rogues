import { Trash } from "@phosphor-icons/react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { CLASSES } from "../../../app/character/characterMapping";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import CheckboxInput from "./CheckboxInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import styles from "./inputs.module.css";

type ClassInputProps = {
  register: UseFormRegister<CharacterDetails>;
  control: Control<CharacterDetails>;
  errors: FieldErrors<CharacterDetails>;
};

const ClassInput = ({ register, control, errors }: ClassInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "class",
  });

  const validateStartingClass = (value, index) => {
    const classes = control._formValues.class;
    const startingClassCount = classes.filter((c) => c.isStartingClass).length;

    if (value && startingClassCount > 1) {
      return "Only one class can be marked as starting class";
    }
    if (!value && startingClassCount === 0) {
      return "One class must be marked as starting class";
    }
    return true;
  };

  return (
    <div className={styles.classSection}>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.classRow}>
          <SelectInput
            register={register}
            name={`class.${index}.name`}
            label="Class"
            required
            error={errors.class?.[index]?.name?.message}
          >
            {CLASSES.map((className) => (
              <option value={className}>{className}</option>
            ))}
          </SelectInput>
          <TextInput
            register={register}
            name={`class.${index}.level`}
            label="Level"
            type="number"
            width="80px"
            placeholder="1"
            required
            error={errors.class?.[index]?.level?.message}
          />
          <TextInput
            register={register}
            name={`class.${index}.subclass`}
            label="Subclass"
            placeholder="Assassin"
            width="300px"
          />
          <CheckboxInput
            register={register}
            name={`class.${index}.spellcasting`}
            label="Spellcaster"
          />
          <CheckboxInput
            register={register}
            name={`class.${index}.isStartingClass`}
            label="Starting Class"
            validate={(value) => validateStartingClass(value, index)}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
            disabled={fields.length === 1}
            style={{ opacity: fields.length === 1 ? 0.5 : 1 }}
          >
            <Trash size={32} />
          </button>
        </div>
      ))}
      <button
        className={`${styles.addButton} action-button`}
        type="button"
        onClick={() =>
          append({
            name: "",
            level: 1,
            isStartingClass: false,
            subclass: "",
            spellcasting: false,
          })
        }
      >
        Add Class
      </button>
    </div>
  );
};

export default ClassInput;
