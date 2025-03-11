// character object

export const STATS = ["str", "dex", "con", "int", "wis", "cha"] as const;

export type ABILITY = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type Class = {
  name: string;
  isStartingClass: boolean;
  level: number;
  subclass: string;
};

export type AbilityScores = {
  [key in ABILITY]: number;
};

export type SavingThrows = {
  [key in ABILITY]: { bonus: number; proficiency: boolean };
};

export type AC = {
  armor: number;
  shield: number;
  bonus: number;
};

export type HitDice = {
  type: string;
  current: number;
  max: number;
};

export type DeathSaves = {
  successes: number;
  failures: number;
};

export type LiveStats = {
  currentHP: number;
  tempHP: number;
  hitDice: HitDice[];
  deathsaves: DeathSaves;
  conditions: String;
  inspiration: boolean;
};

// eslint-disable-next-line
export type Character = {
  id: string;
  name: string;
  createdAt: string;
  author: { name: string; email: string };
  authorId: string;
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
  defenses: String;
  liveStats: LiveStats;
};
