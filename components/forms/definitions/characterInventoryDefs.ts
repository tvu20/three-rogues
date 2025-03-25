import { Currency, Item, Weapon } from "../../../app/character/characterDefs";

export type CharacterInventory = {
  inventory: Item[];
  weapons: Weapon[];
  currency: Currency;
};

export const InventoryStartingValues: CharacterInventory = {
  inventory: [],
  weapons: [],
  currency: {
    pp: 0,
    cp: 0,
    gp: 0,
    ep: 0,
    sp: 0,
  },
};
