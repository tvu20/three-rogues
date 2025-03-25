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

export const generateDefaultItemValues = (items: Item[]) => {
  const modifiedItemValues = items.map((item) => ({
    ...item,

    // have to handle "type" somehow
    attuned: booleanNullToString(item.attuned),
    equipped: booleanNullToString(item.equipped),
  }));
  console.log(modifiedItemValues);
  return modifiedItemValues;
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

  const cleanedItems = inventory.map((item) => ({
    ...item,
    attuned: stringToBooleanNull(item.attuned),
    equipped: stringToBooleanNull(item.equipped),
    quantity: cleanNumberNull(item.quantity),
  }));

  return { weapons: cleanedWeapons, inventory: cleanedItems, currency };
};
