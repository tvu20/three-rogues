import { Character } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ABILITY } from "../../../app/character/characterDefs";
import {
  ABILITY_SCORE_MAPPING,
  SKILL_DESCRIPTION_MAPPING,
  SKILL_MAPPING,
} from "../../../app/character/characterMapping";
import {
  CharacterDetails,
  CharacterDetailsDefaultValues,
} from "../definitions/characterDetailsDefs";
import CheckboxInput from "../inputs/CheckboxInput";
import ClassInput from "../inputs/ClassInput";
import HitDiceInput from "../inputs/HitDiceInput";
import SubmitInput from "../inputs/SubmitInput";
import TextAreaInput from "../inputs/TextAreaInput";
import TextInput from "../inputs/TextInput";
import { cleanCharacterDetails } from "../utils/characterDetailsUtils";
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

  const savingThrowFields = () => {
    return Object.keys(ABILITY_SCORE_MAPPING).map((ability: ABILITY) => (
      <div key={ability} className={styles.savingThrowRow}>
        <TextInput
          key={ability}
          register={register}
          name={`savingThrows.${ability}.bonus`}
          label={`${ability.toUpperCase()} Save Bonus`}
          placeholder="2"
          type="number"
          width="120px"
          required={requiredTesting}
          error={errors.savingThrows?.[ability]?.bonus?.message}
        />
        <CheckboxInput
          register={register}
          name={`savingThrows.${ability}.proficiency`}
          label={`Proficient`}
        />
      </div>
    ));
  };

  const spellSlotFields = () => {
    return Array.from({ length: 9 }, (_, index) => (
      <div key={index} className={styles.spellSlotRow}>
        <TextInput
          key={index}
          register={register}
          name={`liveStats.spellSlots.${index}.max`}
          label={`Level ${index + 1}`}
          placeholder="4"
          type="number"
          width="60px"
        />
      </div>
    ));
  };

  const skillFields = () => {
    return Object.keys(SKILL_MAPPING).map((skill: string) => (
      <div key={skill} className={styles.skillRow}>
        <div className={styles.skillLabelContainer}>
          <h6 className={styles.skillLabel}>{skill}</h6>
          <p className={styles.skillDescription}>
            {SKILL_DESCRIPTION_MAPPING[skill]}
          </p>
        </div>
        <CheckboxInput
          register={register}
          name={`skills.${skill}.proficient`}
          label="Proficient"
        />
        <CheckboxInput
          register={register}
          name={`skills.${skill}.expertise`}
          label="Expertise"
        />
        <div style={{ width: "20px" }} />
        <TextInput
          register={register}
          name={`skills.${skill}.bonus`}
          label="Extra Bonus"
          placeholder="0"
          type="number"
          width="100px"
        />
        <TextInput
          register={register}
          name={`skills.${skill}.source`}
          label="Source"
          placeholder="Racial Bonus"
          width="150px"
        />
      </div>
    ));
  };

  const onSubmit: SubmitHandler<CharacterDetails> = (data) => {
    const cleanedData = cleanCharacterDetails(data);
    console.log(cleanedData);
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a New Character</h1>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Basic Information
        </h3>
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
            placeholder="1"
            required={requiredTesting}
            error={errors.level?.message}
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
          Saving Throws
        </h3>
        <div className={styles.formRow}>{savingThrowFields()}</div>
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
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Hit Dice
        </h3>
        <div className={styles.formRow}>
          <HitDiceInput register={register} control={control} errors={errors} />
        </div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Spellcasting
        </h3>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="cantripsKnown"
            label="Cantrips Known"
            placeholder="2"
            type="number"
            width="100px"
          />
          <TextInput
            register={register}
            name="spellsKnown"
            label="Spells Known"
            placeholder="4"
            type="number"
            width="100px"
          />
          <TextInput
            register={register}
            name="maxPrepared"
            label="Max Spells Prepared"
            placeholder="3"
            type="number"
            width="130px"
          />
          <TextInput
            register={register}
            name="spellcastingFocus"
            label="Spellcasting Focus"
            placeholder="Amulet of the Moon"
            width="300px"
          />
        </div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Spell Slots
        </h3>
        <div className={styles.formRow}>{spellSlotFields()}</div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Skills
        </h3>
        <div className={`${styles.formRow} ${styles.skillsContainer}`}>
          {skillFields()}
        </div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Proficiencies
        </h3>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="armorProficiencies"
            label="Armor Proficiencies"
            placeholder="Light Armor, Medium Armor"
            fullWidth
          />
          <TextInput
            register={register}
            name="weaponProficiencies"
            label="Weapon Proficiencies"
            placeholder="Longsword, Shortsword"
            fullWidth
          />
          <TextInput
            register={register}
            name="toolProficiencies"
            label="Tool Proficiencies"
            placeholder="Smith's Tools, Herbalism Kit"
            fullWidth
          />
          <TextInput
            register={register}
            name="languagesKnown"
            label="Languages Known"
            placeholder="Common, Elvish"
            fullWidth
          />
        </div>
        <h3 className={`small-section-header ${styles.removeBottomMargin}`}>
          Appearance
        </h3>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="height"
            label="Height"
            placeholder="5'8''"
          />
          <TextInput
            register={register}
            name="hair"
            label="Hair"
            placeholder="Brown"
          />
          <TextInput
            register={register}
            name="eyes"
            label="Eyes"
            placeholder="Brown"
          />
          <TextInput
            register={register}
            name="skin"
            label="Skin"
            placeholder="Tan"
          />
        </div>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name="allies"
            label="Allies"
            placeholder="The High Priestess of the Moon"
            fullWidth
          />
          <TextInput
            register={register}
            name="organization"
            label="Organization"
            placeholder="The Order of the Silver Moon"
            fullWidth
          />
          <TextAreaInput
            register={register}
            name="backstory"
            label="Backstory"
            placeholder="Once upon a time..."
          />
        </div>
        {/* // missing backstory slot here */}
        <SubmitInput />
      </form>
    </div>
  );
};

export default CharacterDetailsForm;
