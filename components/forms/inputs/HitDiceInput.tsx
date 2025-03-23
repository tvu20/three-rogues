import { Trash } from "@phosphor-icons/react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import TextInput from "./TextInput";
import styles from "./inputs.module.css";

type HitDiceInputProps = {
  register: UseFormRegister<CharacterDetails>;
  control: Control<CharacterDetails>;
  errors: FieldErrors<CharacterDetails>;
};

const HitDiceInput = ({ register, control, errors }: HitDiceInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "liveStats.hitDice",
  });

  return (
    <div className={styles.hitDiceSection}>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.hitDiceRow}>
          <TextInput
            register={register}
            name={`liveStats.hitDice.${index}.max`}
            type="number"
            label="Amount"
            placeholder="1"
            width="120px"
            required
            error={errors.liveStats?.hitDice?.[index]?.max?.message}
          />
          <TextInput
            register={register}
            name={`liveStats.hitDice.${index}.type`}
            label="Hit Dice Type"
            placeholder="d8"
            width="150px"
            required
            // @ts-ignore
            error={errors.liveStats?.hitDice?.[index]?.type?.message}
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
            max: 1,
            type: "",
          })
        }
      >
        Add Hit Dice Type
      </button>
    </div>
  );
};

export default HitDiceInput;
