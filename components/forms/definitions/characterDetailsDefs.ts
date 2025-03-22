import {
  AbilityScores,
  AC,
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
  age: string;
  class: Class[];
  abilityScores: AbilityScores;
  maxHP: number;
  proficiencyBonus: number;
  initiative: number;
  ac: AC;
  speed: {
    walk: number;
    fly: number;
    swim: number;
    climb: number;
  };
  darkvision: number;
  savingThrows: SavingThrows;
  defenses: string;
  attacksPerAction?: number;
  spellcaster: boolean;
  spellsKnown?: number;
  cantripsKnown?: number;
  maxPrepared?: number;
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
  age: "",
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
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  },
  maxHP: 0,
  proficiencyBonus: 0,
  initiative: 0,
  ac: {
    armor: 0,
    shield: 0,
    bonus: 0,
  },
  speed: {
    walk: 0,
    fly: 0,
    swim: 0,
    climb: 0,
  },
  darkvision: 0,
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
  spellcaster: false,
  spellsKnown: 0,
  cantripsKnown: 0,
  maxPrepared: 0,
  spellcastingFocus: "",
  armorProficiencies: "",
  weaponProficiencies: "",
  toolProficiencies: "",
  languagesKnown: "",
};
