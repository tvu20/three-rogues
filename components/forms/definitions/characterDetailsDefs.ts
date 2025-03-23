import {
  AbilityScores,
  Class,
  SavingThrows,
} from "../../../app/character/characterDefs";

export type CharacterDetails = {
  name: string;
  avatar: string;
  race: string;
  level: number;
  pronouns: string;
  background: string;
  alignment: string;
  age: number;
  class: Class[];
  abilityScores: AbilityScores;
  savingThrows: SavingThrows;
  maxHP: number;
  proficiencyBonus: number;
  initiative: number;
  darkvision: string;
  ac: {
    armor: number | null;
    shield: number | null;
    bonus: number | null;
  };
  speed: {
    walk: string;
    fly: string;
    swim: string;
    climb: string;
  };
  defenses: string;
  attacksPerAction?: number;
  spellsKnown: number;
  cantripsKnown: number;
  maxPrepared: number;
  spellcastingFocus?: string;
  armorProficiencies?: string;
  weaponProficiencies?: string;
  toolProficiencies?: string;
  languagesKnown?: string;
};

export const CharacterDetailsDefaultValues: CharacterDetails = {
  name: "",
  avatar: "",
  race: "",
  level: 1,
  pronouns: "",
  background: "",
  alignment: "",
  age: 0,
  class: [
    {
      name: "",
      isStartingClass: true,
      level: 1,
      subclass: "",
      spellcasting: false,
    },
  ],
  abilityScores: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  },
  maxHP: 0,
  proficiencyBonus: 0,
  initiative: 0,
  ac: {
    armor: null,
    shield: null,
    bonus: null,
  },
  speed: {
    walk: "",
    fly: "",
    swim: "",
    climb: "",
  },
  darkvision: "",
  savingThrows: {
    str: { bonus: 0, proficiency: false },
    dex: { bonus: 0, proficiency: false },
    con: { bonus: 0, proficiency: false },
    int: { bonus: 0, proficiency: false },
    wis: { bonus: 0, proficiency: false },
    cha: { bonus: 0, proficiency: false },
  },
  defenses: "",
  attacksPerAction: 1,
  spellsKnown: 0,
  cantripsKnown: 0,
  maxPrepared: 0,
  spellcastingFocus: "",
  armorProficiencies: "",
  weaponProficiencies: "",
  toolProficiencies: "",
  languagesKnown: "",
};
