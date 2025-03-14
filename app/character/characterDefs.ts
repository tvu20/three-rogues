// character object

export const STATS = ["str", "dex", "con", "int", "wis", "cha"] as const;

export type ABILITY = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type LINKED_ABILITY =
  | "action"
  | "bonusaction"
  | "reaction"
  | "other"
  | ""
  | null;

export type RESETS_ON = "short" | "long" | null;

export type SPELL_TYPE =
  | "damage"
  | "buff"
  | "debuff"
  | "utility"
  | "protection"
  | "control";

export type SPELL_SCHOOL =
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation";

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
  conditions: string;
  inspiration: boolean;
  concentration?: string;
  spellSlots?: SpellSlots;
  trackedFeatures?: Feature[];
};

export type SpellSlots = {
  [key: string]: {
    current: number;
    max: number;
  };
};

export type Feature = {
  id: string;
  createdAt: string;
  characterId: string;
  name: string;
  level?: number;
  linkedAbility?: LINKED_ABILITY;
  description: string;
  source: string;
  class?: string;
  options?: {
    [key: string]: string;
  } | null;
  tracked: boolean;
  max?: number;
  used?: number;
  resetsOn?: RESETS_ON;
  shortDescription?: string;
};

export type Weapon = {
  id: string;
  createdAt: string;
  characterId: string;
  name: string;
  description?: string;
  linkedAbility?: LINKED_ABILITY;
  range?: string;
  ability?: ABILITY;
  proficient?: boolean;
  damage: string;
  damageType?: string;
  hitBonus?: number;
  properties?: string;
  equipped?: boolean;
  inInventory?: boolean;
};

export type Spell = {
  id: string;
  createdAt: string;
  characterId: string;
  name: string;
  description: string;
  source: string;
  type: SPELL_TYPE;
  level: string;
  school: SPELL_SCHOOL;
  components: string;
  castingTime: string;
  range: string;
  duration: string;
  ritual?: boolean;
  concentration: boolean;
  prepared?: boolean;
  damage?: string;
  save?: ABILITY;
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
  defenses: string;
  attacksPerAction?: number;
  spellcaster: boolean;
  castingAbility?: ABILITY;
  spellsKnown?: number;
  cantripsKnown?: number;
  maxPrepared?: number;
  spellcastingFocus?: string;
  armorProficiencies?: string;
  weaponProficiencies?: string;
  toolProficiencies?: string;
  languagesKnown?: string;

  liveStats: LiveStats;
  features: Feature[];
  weapons: Weapon[];
  spells: Spell[];
};
