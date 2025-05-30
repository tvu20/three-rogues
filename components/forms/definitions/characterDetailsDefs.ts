import {
  AbilityScores,
  Class,
  LINKED_ABILITY,
  RESETS_ON,
  SavingThrows,
} from "../../../app/character/characterDefs";

export type CharacterDetails = {
  id?: string;
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
  savingThrows: SavingThrows;
  maxHP: number;
  proficiencyBonus: number;
  initiative: number;
  darkvision: number | null;
  ac: {
    armor: number;
    shield: number;
    bonus: number;
  };
  speed: {
    walk: string;
    fly: string;
    swim: string;
    climb: string;
  };
  defenses: string;
  attacksPerAction: number;
  spellsKnown: number;
  cantripsKnown: number;
  maxPrepared: number;
  spellcastingFocus: string;
  armorProficiencies: string;
  weaponProficiencies: string;
  toolProficiencies: string;
  languagesKnown: string;

  liveStats: {
    hitDice: {
      max: number;
      type: string;
    }[];
    spellSlots: {
      [key: string]: {
        max: number;
      };
    };
  };
  skills: {
    [key: string]: {
      name: string;
      proficient: boolean;
      expertise: boolean;
      bonus: number;
      source: string;
    };
  };
  features: {
    id?: string;
    name: string;
    level: number | null;
    linkedAbility: LINKED_ABILITY;
    description: string;
    source: string;
    class: string | null;
    options:
      | {
          name: string;
          description: string;
        }[]
      | null;
    tracked: boolean;
    max: number;
    resetsOn: RESETS_ON;
    shortDescription: string;
    used?: number;
  }[];

  height: string;
  hair: string;
  eyes: string;
  skin: string;
  allies: string;
  organization: string;
  backstory: string;
  images: {
    value: string;
  }[];
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
      name: "Artificer",
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
    armor: 0,
    shield: 0,
    bonus: 0,
  },
  speed: {
    walk: "",
    fly: "",
    swim: "",
    climb: "",
  },
  darkvision: 60,
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

  liveStats: {
    hitDice: [],
    spellSlots: {},
  },
  features: [
    {
      name: "",
      level: null,
      linkedAbility: "",
      description: "",
      source: "class",
      class: "",
      options: [],
      tracked: false,
      max: 0,
      resetsOn: null,
      shortDescription: "",
    },
  ],

  height: "",
  hair: "",
  eyes: "",
  skin: "",
  allies: "",
  organization: "",
  backstory: "",
  images: [],

  skills: {
    Acrobatics: {
      name: "Acrobatics",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    "Animal Handling": {
      name: "Animal Handling",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Arcana: {
      name: "Arcana",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Athletics: {
      name: "Athletics",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Deception: {
      name: "Deception",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    History: {
      name: "History",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Insight: {
      name: "Insight",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Intimidation: {
      name: "Intimidation",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Investigation: {
      name: "Investigation",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Medicine: {
      name: "Medicine",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Nature: {
      name: "Nature",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Perception: {
      name: "Perception",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Performance: {
      name: "Performance",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Persuasion: {
      name: "Persuasion",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Religion: {
      name: "Religion",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    "Sleight of Hand": {
      name: "Sleight of Hand",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Stealth: {
      name: "Stealth",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
    Survival: {
      name: "Survival",
      proficient: false,
      expertise: false,
      bonus: 0,
      source: "",
    },
  },
};
