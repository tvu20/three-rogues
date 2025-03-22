import { Character } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ABILITY } from "../../../app/character/characterDefs";
import { ABILITY_SCORE_MAPPING } from "../../../app/character/characterMapping";
import {
  CharacterDetails,
  CharacterDetailsDefaultValues,
} from "../definitions/characterDetailsDefs";
import ClassInput from "../inputs/ClassInput";
import SubmitInput from "../inputs/SubmitInput";
import TextInput from "../inputs/TextInput";
import styles from "./CharacterDetailsForm.module.css";

const requiredTesting = false;

type CharacterDetailsFormProps = {
  character?: Character;
};

const CharacterDetailsForm = ({ character }: CharacterDetailsFormProps) => {
  // TODO: if character is provided, fill defaultValues with character data
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CharacterDetails>({
    defaultValues: CharacterDetailsDefaultValues,
  });

  const abilityScoreFields = () => {
    return Object.keys(ABILITY_SCORE_MAPPING).map((ability: ABILITY) => (
      <TextInput
        key={ability}
        register={register}
        name={`abilityScores.${ability}`}
        label={ABILITY_SCORE_MAPPING[ability]}
        placeholder="10"
        width="80px"
        type="number"
        required={requiredTesting}
        error={errors.abilityScores?.[ability]?.message}
        validate={(value) => {
          if (Number(value) < 1) return "Must be at least 1";
          if (Number(value) > 30) return "Must be less than 30";
          return true;
        }}
      />
    ));
  };

  const onSubmit: SubmitHandler<CharacterDetails> = (data) => console.log(data);

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a New Character</h1>
        <h2 className="section-header">Basic Information</h2>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="name"
            label="Name"
            placeholder="Astarion Ancunín"
            required={requiredTesting}
            error={errors.name?.message}
          />
          <TextInput
            register={register}
            name="race"
            label="Race"
            width="150px"
            placeholder="High Elf"
            required={requiredTesting}
            error={errors.race?.message}
          />
          <TextInput
            register={register}
            name="level"
            label="Level"
            width="80px"
            type="number"
          />
        </div>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="pronouns"
            label="Pronouns"
            placeholder="He/him"
            width="150px"
          />
          <TextInput
            register={register}
            name="background"
            label="Background"
            placeholder="Courtesan"
            required={requiredTesting}
            error={errors.background?.message}
          />
          <TextInput
            register={register}
            name="alignment"
            label="Alignment"
            placeholder="Chaotic Neutral"
          />
          <TextInput
            register={register}
            name="age"
            label="Age"
            placeholder="263"
            type="number"
            width="80px"
          />
        </div>
        <div className={styles.formRow}>
          {/* TODO: preview avatar image, add image upload */}
          <TextInput
            register={register}
            name="avatar"
            label="Avatar"
            placeholder="https://example.com/avatar.png"
            fullWidth
          />
        </div>
        <h3 className="small-section-header">
          Character Class
          <span className={styles.errorMessage}>
            <br />
            {errors?.class?.[0]?.isStartingClass?.message}
          </span>
        </h3>
        <div className={styles.formRow}>
          <ClassInput register={register} control={control} errors={errors} />
        </div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Ability Scores
        </h3>
        <div className={styles.formRow}>{abilityScoreFields()}</div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Combat Stats
        </h3>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="maxHP"
            label="Max HP"
            placeholder="10"
            type="number"
            width="80px"
            required={requiredTesting}
            error={errors.maxHP?.message}
          />
          <TextInput
            register={register}
            name="proficiencyBonus"
            label="Proficiency Bonus"
            placeholder="10"
            type="number"
            width="120px"
            required={requiredTesting}
            error={errors.proficiencyBonus?.message}
          />
          <TextInput
            register={register}
            name="initiative"
            label="Initiative"
            placeholder="10"
            type="number"
            width="80px"
            required={requiredTesting}
            error={errors.initiative?.message}
          />
          <TextInput
            register={register}
            name="attacksPerAction"
            label="Attacks per Action"
            placeholder="1"
            type="number"
            width="150px"
            required={requiredTesting}
            error={errors.attacksPerAction?.message}
          />
          <TextInput
            register={register}
            name="darkvision"
            label="Darkvision"
            placeholder="30ft"
            width="150px"
          />
        </div>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="ac.armor"
            label="Base Armor Class"
            placeholder="14"
            type="number"
            width="150px"
            required={requiredTesting}
            error={errors.ac?.armor?.message}
          />
          <TextInput
            register={register}
            name="ac.shield"
            label="Shield Bonus"
            placeholder="2"
            type="number"
            width="120px"
            required={requiredTesting}
            error={errors.ac?.shield?.message}
          />
          <TextInput
            register={register}
            name="ac.bonus"
            label="AC Bonus"
            placeholder="0"
            type="number"
            width="120px"
            required={requiredTesting}
            error={errors.ac?.bonus?.message}
          />
        </div>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="speed.walk"
            label="Walking Speed"
            placeholder="30ft"
            width="150px"
          />
          <TextInput
            register={register}
            name="speed.fly"
            label="Flying Speed"
            placeholder="30ft"
            width="150px"
          />
          <TextInput
            register={register}
            name="speed.swim"
            label="Swimming Speed"
            placeholder="30ft"
            width="150px"
          />
          <TextInput
            register={register}
            name="speed.climb"
            label="Climbing Speed"
            placeholder="30ft"
            width="150px"
          />
        </div>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="defenses"
            label="Defenses"
            placeholder="Immune to Magical Sleep"
            fullWidth
          />
        </div>
        <SubmitInput />
      </form>
    </div>
  );
};

export default CharacterDetailsForm;
