import { Creature } from "../../../app/character/characterDefs";

export type CharacterCreatures = {
  data: Creature[];
};

export const CreatureStartingValues: Creature = {
  name: "",
  ac: 10,
  maxHP: 0,
  speed: "",
  type: "",
  notes: "",
  proficiencyBonus: 0,
  passivePerception: null,
  abilityScores: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  },
  savingThrows: "",
  skills: "",
  senses: "",
  languages: "",
  features: [],
  combat: [],
};
