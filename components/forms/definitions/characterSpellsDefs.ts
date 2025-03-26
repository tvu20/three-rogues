import { Spell } from "../../../app/character/characterDefs";

export type CharacterSpells = {
  data: Spell[];
};

export const SpellStartingValues: Spell = {
  name: "",
  description: "",
  source: "",
  type: "damage",
  level: "cantrip",
  school: "abjuration",
  components: "",
  castingTime: "1A",
  range: "",
  duration: "1 Rnd",
  ritual: false,
  concentration: false,
  prepared: "null",
  damage: "",
  save: "null",
};
