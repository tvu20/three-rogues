import { Currency, Item, Weapon } from "../../../app/character/characterDefs";

export type CharacterInventory = {
  inventory: Item[];
  weapons: Weapon[];
  currency: Currency;
};

export const WeaponStartingValues: Weapon = {
  name: "",
  description: "",
  linkedAbility: "action", // might restrict this to certain values
  range: "",
  ability: "str", // also restricted
  proficient: "true", // null/true/false, see spell prepared
  damage: "",
  damageType: "",
  hitBonus: 0,
  properties: "",
  equipped: false,
  inInventory: false,
  quantity: 0,
};
