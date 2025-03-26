import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { ITEM_TYPES } from "../../../app/character/characterMapping";
import {
  CharacterInventory,
  ItemStartingValues,
} from "../definitions/characterInventoryDefs";
import styles from "./inputs.module.css";
import MultiSelectInput from "./MultiSelectInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

type InventoryInputProps = {
  register: UseFormRegister<CharacterInventory>;
  control: Control<CharacterInventory>;
  errors: FieldErrors<CharacterInventory>;
};

const InventoryInput = ({ register, control, errors }: InventoryInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventory",
  });
  return (
    <>
      <div className={styles.weaponSection}>
        {fields.map((field, index) => (
          <div key={field.id} className={`content-box ${styles.weaponItem}`}>
            <div className={styles.featureItemRow}>
              <TextInput
                register={register}
                name={`inventory.${index}.name`}
                label="Name"
                placeholder="Deck of Many Things"
                width="200px"
                required
                error={errors.inventory?.[index]?.name?.message}
              />
              <TextInput
                register={register}
                name={`inventory.${index}.quantity`}
                label="Quantity"
                type="number"
                placeholder="2"
                width="100px"
              />
              <SelectInput
                register={register}
                name={`inventory.${index}.equipped`}
                label="Equipped?"
                width="100px"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
                <option value="null">N/A</option>
              </SelectInput>
              <SelectInput
                register={register}
                name={`inventory.${index}.attuned`}
                label="Attuned?"
                width="150px"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
                <option value="null">N/A</option>
              </SelectInput>
            </div>
            <div className={styles.featureItemRow}>
              <MultiSelectInput
                register={register}
                name={`inventory.${index}.type`}
                label="Type"
                options={ITEM_TYPES.filter((type) => type !== "weapon")}
                width="200px"
              />
              <TextInput
                register={register}
                name={`inventory.${index}.notes`}
                label="Notes"
                placeholder="In bag of holding"
              />
            </div>
            <div className={styles.featureItemRow}>
              <TextAreaInput
                register={register}
                name={`inventory.${index}.description`}
                label="Description"
                height="140px"
                placeholder="Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. As soon as you draw a card from the deck, its magic takes effect. "
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => remove(index)}
                className={styles.featureDeleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`${styles.addButton} action-button`}
        type="button"
        onClick={() => append(ItemStartingValues)}
      >
        Add Item
      </button>
    </>
  );
};

export default InventoryInput;
