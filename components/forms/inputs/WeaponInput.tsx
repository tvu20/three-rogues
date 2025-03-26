import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { STATS } from "../../../app/character/characterDefs";
import { ABILITY_SCORE_MAPPING } from "../../../app/character/characterMapping";
import {
  CharacterInventory,
  WeaponStartingValues,
} from "../definitions/characterInventoryDefs";
import CheckboxInput from "./CheckboxInput";
import styles from "./inputs.module.css";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

type WeaponInputProps = {
  register: UseFormRegister<CharacterInventory>;
  control: Control<CharacterInventory>;
  errors: FieldErrors<CharacterInventory>;
};

const WeaponInput = ({ register, control, errors }: WeaponInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "weapons",
  });

  return (
    <>
      <div className={styles.weaponSection}>
        {fields.map((field, index) => (
          <div key={field.id} className={`content-box ${styles.weaponItem}`}>
            <div className={styles.featureItemRow}>
              <TextInput
                register={register}
                name={`weapons.${index}.name`}
                label="Name"
                placeholder="Flurry of Blows"
                width="200px"
                required
                error={errors.weapons?.[index]?.name?.message}
              />
              <SelectInput
                register={register}
                name={`weapons.${index}.linkedAbility`}
                label="Use"
                width="140px"
              >
                <option value="action">Action</option>
                <option value="bonusaction">Bonus Action</option>
                <option value="reaction">Reaction</option>
              </SelectInput>
              <SelectInput
                register={register}
                name={`weapons.${index}.ability`}
                label="Ability"
                width="150px"
              >
                {STATS.map((type) => (
                  <option key={type} value={type}>
                    {ABILITY_SCORE_MAPPING[type]}
                  </option>
                ))}
                <option value="null">None</option>
              </SelectInput>
              <SelectInput
                register={register}
                name={`weapons.${index}.proficient`}
                label="Proficient?"
                width="150px"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
                <option value="null">N/A</option>
              </SelectInput>
            </div>
            <div className={styles.featureItemRow}>
              <TextInput
                register={register}
                name={`weapons.${index}.hitBonus`}
                label="Bonus to Hit"
                type="number"
                placeholder="0"
                width="80px"
              />
              <TextInput
                register={register}
                name={`weapons.${index}.range`}
                label="Range"
                placeholder="5ft"
                width="130px"
              />
              <TextInput
                register={register}
                name={`weapons.${index}.damage`}
                label="Damage"
                placeholder="1d4 per strike"
                width="140px"
              />
              <TextInput
                register={register}
                name={`weapons.${index}.damageType`}
                label="Damage Type"
                placeholder="Bludgeoning"
                width="150px"
              />
            </div>
            <div className={styles.featureItemRow}>
              <TextInput
                register={register}
                name={`weapons.${index}.properties`}
                label="Properties"
                placeholder="Light, Finesse"
              />
              <TextInput
                register={register}
                name={`weapons.${index}.quantity`}
                label="Quantity"
                type="number"
                placeholder="2"
                width="100px"
              />
              <CheckboxInput
                register={register}
                name={`weapons.${index}.equipped`}
                label="Equipped"
                marginTop="14px"
              />
              <CheckboxInput
                register={register}
                name={`weapons.${index}.inInventory`}
                label="Display in inventory"
                marginTop="14px"
              />
            </div>
            <div className={styles.featureItemRow}>
              <TextAreaInput
                register={register}
                name={`weapons.${index}.description`}
                label="Description"
                height="100px"
                placeholder="Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action."
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
        onClick={() => append(WeaponStartingValues)}
      >
        Add Weapon
      </button>
    </>
  );
};

export default WeaponInput;
