import { CharacterDetails } from "../definitions/characterDetailsDefs";
import cleanNumber from "./formUtils";

export const cleanCharacterDetails = (data: CharacterDetails) => {
  const cleanedSpellSlots = {};
  Object.entries(data.liveStats.spellSlots).forEach(([key, value]) => {
    if (value.max && !isNaN(value.max)) {
      cleanedSpellSlots[String(Number(key) + 1)] = {
        max: value.max,
        current: value.max,
      };
    }
  });

  const cleanedSkills = Object.values(data.skills).map((skill) => ({
    ...skill,
    bonus: cleanNumber(skill.bonus),
  }));

  const cleanedData = {
    ...data,
    age: cleanNumber(data.age),
    cantripsKnown: cleanNumber(data.cantripsKnown),
    maxPrepared: cleanNumber(data.maxPrepared),
    spellsKnown: cleanNumber(data.spellsKnown),
    liveStats: {
      ...data.liveStats,
      spellSlots: cleanedSpellSlots,
      tempHP: 0,
      currentHP: data.maxHP,
      conditions: "",
      deathsaves: {
        failures: 0,
        successes: 0,
      },
      hitDice: data.liveStats.hitDice.map((dice) => ({
        ...dice,
        current: dice.max,
      })),
      inspiration: false,
    },
    skills: cleanedSkills,
  };
  return cleanedData;
};
