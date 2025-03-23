import { Trash } from "@phosphor-icons/react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import {
  CLASSES,
  FEATURE_SOURCES,
} from "../../../app/character/characterMapping";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import CheckboxInput from "./CheckboxInput";
import styles from "./inputs.module.css";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";
type FeatureInputProps = {
  register: UseFormRegister<CharacterDetails>;
  control: Control<CharacterDetails>;
  errors: FieldErrors<CharacterDetails>;
};

const FeatureOptions = ({ control, register, featureIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `features.${featureIndex}.options`,
  });

  return (
    <div className={styles.optionsContainer}>
      {fields.map((field, optionIndex) => (
        <div key={field.id} className={styles.optionRow}>
          <TextInput
            register={register}
            name={`features.${featureIndex}.options.${optionIndex}.name`}
            label="Option Name"
            placeholder="Advantage"
            width="200px"
          />
          <TextInput
            register={register}
            name={`features.${featureIndex}.options.${optionIndex}.description`}
            label="Option Description"
            placeholder="You need advantage on the attack roll. "
            width="500px"
          />
          <button type="button" onClick={() => remove(optionIndex)}>
            <Trash size={24} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: "", description: "" })}
        className="action-button"
      >
        Add Option
      </button>
    </div>
  );
};

const FeatureInput = ({ register, control, errors }: FeatureInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <div className={styles.featureSection}>
      {fields.map((field, index) => (
        <div key={field.id} className={`content-box ${styles.featureItem}`}>
          <div className={styles.featureItemRow}>
            <TextInput
              register={register}
              name={`features.${index}.name`}
              label="Feature Name"
              placeholder="Sneak Attack"
              width="150px"
              required
              error={errors.features?.[index]?.name?.message}
            />
            <TextInput
              register={register}
              name={`features.${index}.level`}
              label="Level"
              type="number"
              width="80px"
              placeholder="1"
            />
            <SelectInput
              register={register}
              name={`features.${index}.linkedAbility`}
              label="Affects"
            >
              <option value="">None</option>
              <option value="action">Action</option>
              <option value="bonusaction">Bonus Action</option>
              <option value="reaction">Reaction</option>
              <option value="other">Other</option>
            </SelectInput>
            <SelectInput
              register={register}
              name={`features.${index}.source`}
              label="Source"
            >
              {FEATURE_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source.charAt(0).toUpperCase() + source.slice(1)}
                </option>
              ))}
            </SelectInput>
            <SelectInput
              register={register}
              name={`features.${index}.class`}
              label="Associated Class"
            >
              <option value="">None</option>
              {CLASSES.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </SelectInput>
          </div>
          <div className={styles.featureItemRow}>
            <TextInput
              register={register}
              name={`features.${index}.max`}
              label="Max Uses"
              type="number"
              width="80px"
              placeholder="1"
            />
            <SelectInput
              register={register}
              name={`features.${index}.resetsOn`}
              label="Resets On"
            >
              <option value="">None</option>
              <option value="short">Short Rest</option>
              <option value="long">Long Rest</option>
            </SelectInput>
            <CheckboxInput
              register={register}
              name={`features.${index}.tracked`}
              label="Tracked?"
            />
          </div>
          <div className={styles.featureItemRow}>
            <TextInput
              register={register}
              name={`features.${index}.shortDescription`}
              label="Summary"
              placeholder="Deal massive extra single-target damage based on a few conditions."
              fullWidth
            />
          </div>
          <div className={styles.featureItemRow}>
            <TextAreaInput
              register={register}
              name={`features.${index}.description`}
              label="Description"
              height="100px"
              placeholder="Beginning at 1st level, you know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon."
            />
          </div>
          <div className={styles.featureItemRow} style={{ marginBottom: 0 }}>
            <FeatureOptions
              control={control}
              register={register}
              featureIndex={index}
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
              Delete Feature
            </button>
          </div>
        </div>
      ))}
      <button
        className={`${styles.addButton} action-button`}
        type="button"
        onClick={() =>
          append({
            name: "",
            level: null,
            linkedAbility: "",
            description: "",
            source: "class",
            class: "",
            options: [],
            tracked: false,
            max: 0,
            resetsOn: "",
            shortDescription: "",
          })
        }
      >
        Add Feature
      </button>
    </div>
  );
};

export default FeatureInput;
