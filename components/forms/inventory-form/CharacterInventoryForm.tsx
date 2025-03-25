import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Currency, Item, Weapon } from "../../../app/character/characterDefs";
import { useAppDispatch } from "../../../utils/redux";
import { CharacterInventory } from "../definitions/characterInventoryDefs";
import SubmitInput from "../inputs/SubmitInput";
import TextInput from "../inputs/TextInput";
import WeaponInput from "../inputs/WeaponInput";
import {
  cleanCharacterInventory,
  generateDefaultItemValues,
  generateDefaultWeaponValues,
} from "../utils/characterInventoryUtils";

import InventoryInput from "../inputs/InventoryInput";
import styles from "./CharacterInventoryForm.module.css";

type CharacterInventoryFormProps = {
  id: string;
  inventory: Item[];
  weapons: Weapon[];
  currency: Currency;
  name: string;
};

const CharacterInventoryForm = ({
  id,
  inventory,
  weapons,
  currency,
  name,
}: CharacterInventoryFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CharacterInventory>({
    defaultValues: {
      currency,
      inventory: generateDefaultItemValues(inventory),
      weapons: generateDefaultWeaponValues(weapons),
    },
  });

  const onSubmit: SubmitHandler<CharacterInventory> = async (data) => {
    const cleanedData = cleanCharacterInventory(
      data.weapons,
      data.inventory,
      data.currency
    );
    console.log("data", cleanedData);
  };

  //   if (isLoading) {
  //     return <Loader />;
  //   }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Inventory</h1>
        <h2>{name}</h2>
        <h3>Currency</h3>
        <div className={styles.formRow}>
          <TextInput
            register={register}
            name={`currency.pp`}
            label="Platinum"
            type="number"
            placeholder="0"
            width="120px"
          />
          <TextInput
            register={register}
            name={`currency.gp`}
            label="Gold"
            type="number"
            placeholder="0"
            width="120px"
          />
          <TextInput
            register={register}
            name={`currency.ep`}
            label="Electrum"
            type="number"
            placeholder="0"
            width="120px"
          />
          <TextInput
            register={register}
            name={`currency.sp`}
            label="Silver"
            type="number"
            placeholder="0"
            width="120px"
          />
          <TextInput
            register={register}
            name={`currency.cp`}
            label="Copper"
            type="number"
            placeholder="0"
            width="120px"
          />
        </div>
        <h3 className={styles.marginBottom}>Weapons and Attacks</h3>
        <WeaponInput register={register} control={control} errors={errors} />
        <h3 className={styles.marginBottom}>Inventory</h3>
        <InventoryInput register={register} control={control} errors={errors} />
        <div className={`${styles.formRow} ${styles.buttonContainer}`}>
          <SubmitInput />
        </div>
      </form>
    </div>
  );
};

export default CharacterInventoryForm;
