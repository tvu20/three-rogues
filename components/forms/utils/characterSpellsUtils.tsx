import { ABILITY, Spell } from "../../../app/character/characterDefs";
import { CharacterSpells } from "../definitions/characterSpellsDefs";
import {
  booleanNullToString,
  cleanStringNull,
  stringToBooleanNull,
} from "./formUtils";
export const generateDefaultValues = (spells: Spell[]) => {
  const modifiedSpellValues = spells.map((spell) => ({
    ...spell,
    prepared: booleanNullToString(spell.prepared),
    save: spell.save === null ? "null" : (spell.save as ABILITY),
  }));
  return {
    data: modifiedSpellValues,
  };
};

export const cleanCharacterSpells = (spells: CharacterSpells) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modifiedSpellValues = spells.data.map(({ characterId, ...spell }) => ({
    ...spell,
    prepared: stringToBooleanNull(spell.prepared),
    damage: cleanStringNull(spell.damage),
    save: spell.save === "null" ? null : (spell.save as ABILITY),
  }));
  return modifiedSpellValues;
};
