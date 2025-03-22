import { Character } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CharacterDetails,
  CharacterDetailsDefaultValues,
} from "../definitions/characterDetailsDefs";
import SubmitInput from "../inputs/SubmitInput";
import TextInput from "../inputs/TextInput";
import styles from "./CharacterDetailsForm.module.css";
type CharacterDetailsFormProps = {
  character?: Character;
};

const CharacterDetailsForm = ({ character }: CharacterDetailsFormProps) => {
  // TODO: if character is provided, fill defaultValues with character data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CharacterDetails>({
    defaultValues: CharacterDetailsDefaultValues,
  });

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
            required
            error={errors.name?.message}
          />
          <TextInput
            register={register}
            name="race"
            label="Race"
            width="150px"
            placeholder="High Elf"
            required
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
            required
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
        <h3 className="small-section-header">Character Stats</h3>
        <SubmitInput />
      </form>
    </div>
  );
};

export default CharacterDetailsForm;
