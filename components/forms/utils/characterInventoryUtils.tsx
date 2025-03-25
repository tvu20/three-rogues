import {
  ABILITY,
  Currency,
  Item,
  Weapon,
} from "../../../app/character/characterDefs";
import {
  booleanNullToString,
  cleanNumberNull,
  stringToBooleanNull,
} from "./formUtils";
export const generateDefaultWeaponValues = (weapons: Weapon[]) => {
  const modifiedWeaponValues = weapons.map((weapon) => ({
    ...weapon,
    proficient: booleanNullToString(weapon.proficient),
    ability: weapon.ability === "null" ? null : (weapon.ability as ABILITY),
  }));
  return modifiedWeaponValues;
};

export const cleanCharacterInventory = (
  weapons: Weapon[],
  inventory: Item[],
  currency: Currency
) => {
  const cleanedWeapons = weapons.map((weapon) => ({
    ...weapon,
    proficient: stringToBooleanNull(weapon.proficient),
    ability: weapon.ability === "null" ? null : (weapon.ability as ABILITY),
    hitBonus: cleanNumberNull(weapon.hitBonus),
    quantity: cleanNumberNull(weapon.quantity),
  }));

  return { weapons: cleanedWeapons, inventory, currency };
};
