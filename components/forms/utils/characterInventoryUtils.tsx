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
    attuned: booleanNullToString(item.attuned),
    equipped: booleanNullToString(item.equipped),
  }));
  return modifiedItemValues;
};

export const cleanCharacterInventory = (
  weapons: Weapon[],
  inventory: Item[],
  currency: Currency
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cleanedWeapons = weapons.map(({ characterId, ...weapon }) => ({
    ...weapon,
    proficient: stringToBooleanNull(weapon.proficient),
    ability: weapon.ability === "null" ? null : (weapon.ability as ABILITY),
    hitBonus: cleanNumberNull(weapon.hitBonus),
    quantity: cleanNumberNull(weapon.quantity),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cleanedItems = inventory.map(({ characterId, ...item }) => ({
    ...item,
    attuned: stringToBooleanNull(item.attuned),
    equipped: stringToBooleanNull(item.equipped),
    quantity: cleanNumberNull(item.quantity),
  }));

  return { weapons: cleanedWeapons, inventory: cleanedItems, currency };
};
