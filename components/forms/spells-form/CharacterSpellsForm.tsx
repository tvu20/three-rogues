import { useRouter } from "next/router";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useUpdateSpellsMutation } from "../../../app/api/apiSlice";
import { Spell, STATS } from "../../../app/character/characterDefs";
import {
  ABILITY_SCORE_MAPPING,
  SPELL_LEVELS,
  SPELL_SCHOOLS,
  SPELL_TYPES,
} from "../../../app/character/characterMapping";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import { useAppDispatch } from "../../../utils/redux";
import Loader from "../../shared/layout/Loader";
import {
  CharacterSpells,
  SpellStartingValues,
} from "../definitions/characterSpellsDefs";
import CheckboxInput from "../inputs/CheckboxInput";
import SelectInput from "../inputs/SelectInput";
import SubmitInput from "../inputs/SubmitInput";
import TextAreaInput from "../inputs/TextAreaInput";
import TextInput from "../inputs/TextInput";
import {
  cleanCharacterSpells,
  generateDefaultValues,
} from "../utils/characterSpellsUtils";
import styles from "./CharacterSpellsForm.module.css";
type CharacterSpellsFormProps = {
  id: string;
  spells: Spell[];
  name: string;
};

const CharacterSpellsForm = ({
  id,
  spells,
  name,
}: CharacterSpellsFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [updateSpells, { isLoading }] = useUpdateSpellsMutation();
  const defaultValues = generateDefaultValues(spells);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CharacterSpells>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const onSubmit: SubmitHandler<CharacterSpells> = async (data) => {
    const cleanedData = cleanCharacterSpells(data);

    try {
      await updateSpells({
        id,
        spells: cleanedData,
      }).unwrap();

      dispatch(
        setSnackbar({
          message: "Spells updated!",
          severity: "success",
        })
      );

      router.push(`/character/${id}`);
    } catch (err) {
      dispatch(
        setSnackbar({
          message:
            "Error: " + (err.data?.message || err.message || "Unknown error"),
          severity: "error",
        })
      );
    }
  };

  const createSpells = () => {
    {
      return fields.map((field, index) => (
        <div key={field.id} className={`content-box ${styles.spellContainer}`}>
          <div className={styles.formRow}>
            <TextInput
              register={register}
              name={`data.${index}.name`}
              label="Name"
              placeholder="Fireball"
              required
              error={errors.data?.[index]?.name?.message}
              width="200px"
            />
            <SelectInput
              register={register}
              name={`data.${index}.level`}
              label="Level"
              width="90px"
            >
              {SPELL_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </SelectInput>
            <SelectInput
              register={register}
              name={`data.${index}.school`}
              label="School"
              width="150px"
            >
              {SPELL_SCHOOLS.map((school) => (
                <option key={school} value={school}>
                  {school.charAt(0).toUpperCase() + school.slice(1)}
                </option>
              ))}
            </SelectInput>
            <TextInput
              register={register}
              name={`data.${index}.components`}
              label="Components"
              placeholder="V, S, M"
              width="100px"
              required
              error={errors.data?.[index]?.components?.message}
            />
          </div>
          <div className={styles.formRow}>
            <SelectInput
              register={register}
              name={`data.${index}.castingTime`}
              label="Casting Time"
              width="150px"
            >
              <option value="1A">1 Action</option>
              <option value="1BA">1 Bonus Action</option>
              <option value="1 Min">1 Minute</option>
              <option value="1R">1 Reaction</option>
              <option value="1 Hr">1 Hour</option>
              <option value="10 Min">10 Minutes</option>
              <option value="8 Hr">8 Hours</option>
              <option value="12 Hr">12 Hours</option>
              <option value="24 Hr">24 Hours</option>
              <option value="Sp">Special</option>
            </SelectInput>
            <TextInput
              register={register}
              name={`data.${index}.range`}
              label="range"
              width="120px"
              placeholder="120ft"
              required
              error={errors.data?.[index]?.range?.message}
            />
            <SelectInput
              register={register}
              name={`data.${index}.duration`}
              label="Duration"
              width="200px"
            >
              <option value="Inst">Instantaneous</option>
              <option value="1 Rnd">1 Round</option>
              <option value="6 Rnd">6 Rounds</option>
              <option value="1 Min">1 Minute</option>
              <option value="10 Min">10 Minutes</option>
              <option value="1 Hr">1 Hour</option>
              <option value="6 Hr">6 Hours</option>
              <option value="8 Hr">8 Hours</option>
              <option value="24 Hr">24 Hours</option>
              <option value="7 Day">7 Days</option>
              <option value="10 Day">10 Days</option>
              <option value="30 Day">30 Days</option>
              <option value="Inf">Until Dispelled</option>
              <option value="Sp">Special</option>
            </SelectInput>
          </div>
          <div className={styles.formRow}>
            <SelectInput
              register={register}
              name={`data.${index}.prepared`}
              label="Is this spell prepared?"
              width="150px"
            >
              <option value="null">N/A</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectInput>
            <CheckboxInput
              register={register}
              name={`data.${index}.ritual`}
              label="Ritual Spell"
              marginTop="14px"
            />
            <CheckboxInput
              register={register}
              name={`data.${index}.concentration`}
              label="Requires Concentration"
              marginTop="14px"
            />
          </div>
          <div className={styles.formRow}>
            <SelectInput
              register={register}
              name={`data.${index}.type`}
              label="Type"
              width="120px"
            >
              {SPELL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </SelectInput>
            <TextInput
              register={register}
              name={`data.${index}.damage`}
              label="Damage"
              width="120px"
              placeholder="8d6 fire"
            />
            <SelectInput
              register={register}
              name={`data.${index}.save`}
              label="Save"
              width="150px"
            >
              <option value="null">None</option>
              {STATS.map((type) => (
                <option key={type} value={type}>
                  {ABILITY_SCORE_MAPPING[type]}
                </option>
              ))}
            </SelectInput>
            <TextInput
              register={register}
              name={`data.${index}.source`}
              label="Source"
              placeholder="Sorcerer"
              width="150px"
            />
          </div>
          <div className={styles.formRow}>
            <TextAreaInput
              register={register}
              name={`data.${index}.description`}
              label="Description"
              height="150px"
              width="100%"
              placeholder="A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. "
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className={styles.deleteButton}
            >
              Delete Spell
            </button>
          </div>
        </div>
      ));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Spellcasting</h1>
        <h2>{name}</h2>
        <div className={styles.spellsContainer}>{createSpells()}</div>
        <div className={`${styles.formRow} ${styles.buttonContainer}`}>
          <button
            className={`${styles.addButton} action-button`}
            type="button"
            onClick={() => append(SpellStartingValues)}
          >
            Add Spell
          </button>
          <div>
            <button
              className={`action-button ${styles.cancelButton}`}
              type="button"
              onClick={() => router.push(`/character/${id}`)}
            >
              Cancel
            </button>
            <SubmitInput />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CharacterSpellsForm;
