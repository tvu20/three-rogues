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
    name: string;
    level: number | null;
    linkedAbility: string;
    description: string;
    source: string;
    class: string;
    options: {
      name: string;
      description: string;
    }[];
    tracked: boolean;
    max: number;
    resetsOn: string;
    shortDescription: string;
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
      resetsOn: "",
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
