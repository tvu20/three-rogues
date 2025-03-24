import { Spell } from "../../../app/character/characterDefs";
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
    save: spell.save === null ? "null" : spell.save,
  }));
  return {
    data: modifiedSpellValues,
  };
};

export const cleanCharacterSpells = (spells: CharacterSpells) => {
  const modifiedSpellValues = spells.data.map((spell) => ({
    ...spell,
    prepared: stringToBooleanNull(spell.prepared),
    damage: cleanStringNull(spell.damage),
    save: cleanStringNull(spell.save),
  }));
  return {
    data: modifiedSpellValues,
  };
};
