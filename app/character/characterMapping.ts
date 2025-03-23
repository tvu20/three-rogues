import { ABILITY, ITEM_TYPE } from "./characterDefs";

export const ABILITY_SCORE_MAPPING: Record<ABILITY, string> = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma",
};

export const SKILL_MAPPING = {
  Acrobatics: "dex",
  "Animal Handling": "wis",
  Arcana: "int",
  Athletics: "str",
  Deception: "cha",
  History: "int",
  Insight: "wis",
  Intimidation: "cha",
  Investigation: "int",
  Medicine: "wis",
  Nature: "int",
  Perception: "wis",
  Performance: "cha",
  Persuasion: "cha",
  Religion: "int",
  "Sleight of Hand": "dex",
  Stealth: "dex",
  Survival: "wis",
};

export const SKILL_DESCRIPTION_MAPPING = {
  Acrobatics: "How well can I stay on my feet?",
  "Animal Handling": "How good am I with animals?",
  Arcana: "How much do I know about magic?",
  Athletics: "How physically fit am I?",
  Deception: "How good am I at lying?",
  History: "How much do I know about history?",
  Insight: "How well can I read people?",
  Intimidation: "How well can I threaten others?",
  Investigation: "How good am I at solving puzzles?",
  Medicine: "How well can I heal others?",
  Nature: "How much do I know about nature?",
  Perception: "How much do I notice around me?",
  Performance: "How well can I entertain others?",
  Persuasion: "How good am I at convincing others?",
  Religion: "How much do I know about religion?",
  "Sleight of Hand": "How good am I at picking pockets?",
  Stealth: "How well can I hide from others?",
  Survival: "How good am I at surviving in the wild?",
};

export const CLASS_SPELLCASTING_ABILITY = {
  Bard: "cha",
  Paladin: "cha",
  Sorcerer: "cha",
  Warlock: "cha",
  Cleric: "wis",
  Druid: "wis",
  Monk: "wis",
  Ranger: "wis",
  Wizard: "int",
  Artificer: "int",
  Fighter: "int",
  Rogue: "int",
};

export const SPELL_TYPES = [
  "damage",
  "buff",
  "debuff",
  "utility",
  "protection",
  "control",
];

export const ITEM_TYPES: ITEM_TYPE[] = [
  "weapon",
  "equipment",
  "magic item",
  "consumable",
  "gear",
  "other",
];

export const CURRENCY_MAP = {
  pp: "Platinum",
  gp: "Gold",
  sp: "Silver",
  cp: "Copper",
  ep: "Electrum",
};

export const CURRENCY_COLOR_MAP = {
  pp: "var(--color-currency-pp)",
  gp: "var(--color-currency-gp)",
  sp: "var(--color-currency-sp)",
  cp: "var(--color-currency-cp)",
  ep: "var(--color-currency-ep)",
};
