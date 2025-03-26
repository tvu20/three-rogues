import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useUpdateCreaturesMutation } from "../../../app/api/apiSlice";
import { ABILITY, Creature } from "../../../app/character/characterDefs";
import { ABILITY_SCORE_MAPPING } from "../../../app/character/characterMapping";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import { useAppDispatch } from "../../../utils/redux";
import Loader from "../../shared/layout/Loader";
import {
  CharacterCreatures,
  CreatureStartingValues,
} from "../definitions/characterCreaturesDefs";
import SubmitInput from "../inputs/SubmitInput";
import TextInput from "../inputs/TextInput";
import {
  cleanCharacterCreatures,
  generateDefaultValues,
} from "../utils/characterCreaturesUtils";
import styles from "./CharacterCreaturesForm.module.css";

type CharacterCreaturesFormProps = {
  id: string;
  creatures: Creature[];
  name: string;
};

const Feature = ({ control, register, featureIndex, fieldName }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `data.${featureIndex}.${fieldName}`,
  });

  return (
    <div className={styles.optionsContainer}>
      {fields.map((field, optionIndex) => (
        <div key={field.id} className={styles.optionRow}>
          <TextInput
            register={register}
            name={`data.${featureIndex}.${fieldName}.${optionIndex}.name`}
            label={fieldName === "features" ? "Trait" : "Action Name"}
            placeholder={
              fieldName === "features"
                ? "Keen Hearing and Smell"
                : "Action Name"
            }
            width="200px"
          />
          <TextInput
            register={register}
            name={`data.${featureIndex}.${fieldName}.${optionIndex}.description`}
            label="Description"
            placeholder={
              fieldName === "features"
                ? "Advantage on WIS checks with smell."
                : "Action Description"
            }
            width="350px"
          />
          <button type="button" onClick={() => remove(optionIndex)}>
            <Trash size={24} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: "", description: "" })}
        className={`${styles.addTraitButton} action-button`}
      >
        Add {fieldName === "features" ? "Feature" : "Combat Action"}
      </button>
    </div>
  );
};

const CharacterCreaturesForm = ({
  id,
  creatures,
  name,
}: CharacterCreaturesFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [updateCreatures, { isLoading }] = useUpdateCreaturesMutation();

  const defaultValues = generateDefaultValues(creatures);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CharacterCreatures>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const onSubmit: SubmitHandler<CharacterCreatures> = async (data) => {
    const cleanedData = cleanCharacterCreatures(data);

    try {
      await updateCreatures({
        id,
        creatures: cleanedData,
      }).unwrap();

      dispatch(
        setSnackbar({
          message: "Creatures updated!",
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

  const abilityScoreFields = (index: number) => {
    return Object.keys(ABILITY_SCORE_MAPPING).map((ability: ABILITY) => (
      <TextInput
        key={ability}
        register={register}
        name={`data.${index}.abilityScores.${ability}`}
        label={ABILITY_SCORE_MAPPING[ability]}
        placeholder="10"
        width="80px"
        type="number"
        required
        error={errors.data?.[index]?.abilityScores?.[ability]?.message}
        validate={(value) => {
          if (Number(value) < 1) return "Must be at least 1";
          if (Number(value) > 30) return "Must be less than 30";
          return true;
        }}
      />
    ));
  };

  const createCreatures = () => {
    return fields.map((field, index) => (
      <div key={field.id} className={`content-box ${styles.creatureContainer}`}>
        <div>
          <div className={styles.formRow}>
            <TextInput
              register={register}
              name={`data.${index}.name`}
              label="Name"
              placeholder="Wolf"
              required
              error={errors.data?.[index]?.name?.message}
              width="250px"
            />
            <TextInput
              register={register}
              name={`data.${index}.ac`}
              label="AC"
              type="number"
              placeholder="13"
              required
              error={errors.data?.[index]?.ac?.message}
              width="80px"
            />
            <TextInput
              register={register}
              name={`data.${index}.maxHP`}
              label="Max HP"
              type="number"
              placeholder="11"
              required
              error={errors.data?.[index]?.maxHP?.message}
              width="80px"
            />
            <TextInput
              register={register}
              name={`data.${index}.speed`}
              label="Speed"
              placeholder="40ft"
              width="140px"
            />
          </div>
          <div className={styles.formRow}>{abilityScoreFields(index)}</div>
          <div className={styles.formRow}>
            <TextInput
              register={register}
              name={`data.${index}.proficiencyBonus`}
              label="Proficiency Bonus"
              type="number"
              placeholder="2"
              width="120px"
              required
              error={errors.data?.[index]?.proficiencyBonus?.message}
            />
            <TextInput
              register={register}
              name={`data.${index}.passivePerception`}
              label="Passive Perception"
              type="number"
              placeholder="13"
              width="120px"
            />
            <TextInput
              register={register}
              name={`data.${index}.type`}
              label="Type"
              placeholder="Wild Shape"
              width="140px"
            />
            <TextInput
              register={register}
              name={`data.${index}.notes`}
              label="Notes"
              placeholder="Challenge rating 1/4"
              width="300px"
            />
          </div>
          <div className={styles.formRow}>
            <TextInput
              register={register}
              name={`data.${index}.savingThrows`}
              label="Saving Throws"
              placeholder="Str +3, Dex +4"
              width="120px"
            />
            <TextInput
              register={register}
              name={`data.${index}.skills`}
              label="Skills"
              placeholder="Perception +3, Stealth +4"
              width="220px"
            />
            <TextInput
              register={register}
              name={`data.${index}.senses`}
              label="Senses"
              placeholder="Darkvision 60ft"
              width="220px"
            />
            <TextInput
              register={register}
              name={`data.${index}.languages`}
              label="Languages"
              placeholder="None"
              width="200px"
            />
          </div>
          <h3>Traits</h3>
          <div className={styles.formRow}>
            <Feature
              control={control}
              register={register}
              featureIndex={index}
              fieldName="features"
            />
          </div>
          <h3>Combat Actions</h3>
          <div className={styles.formRow}>
            <Feature
              control={control}
              register={register}
              featureIndex={index}
              fieldName="combat"
            />
          </div>
        </div>
        <div>
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
              className={styles.deleteButton}
            >
              Delete Creature
            </button>
          </div>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Creatures</h1>
        <h2>{name}</h2>

        <div className={styles.creaturesContainer}>{createCreatures()}</div>
        <div className={`${styles.formRow} ${styles.buttonContainer}`}>
          <button
            className={`${styles.addButton} action-button`}
            type="button"
            onClick={() => append(CreatureStartingValues)}
          >
            Add Creature
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

export default CharacterCreaturesForm;
