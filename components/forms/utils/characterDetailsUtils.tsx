import { CharacterDetails } from "../definitions/characterDetailsDefs";
import cleanNumber, { cleanNumberNull, cleanStringNull } from "./formUtils";

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

  const cleanedFeatures = data.features.map((feature) => ({
    ...feature,
    level: cleanNumberNull(feature.level),
    linkedAbility: cleanStringNull(feature.linkedAbility),
    class: cleanStringNull(feature.class),
    max: cleanNumberNull(feature.max),
    used: cleanNumberNull(feature.max),
    resetsOn: cleanStringNull(feature.resetsOn),
    options: feature.options.length
      ? Object.fromEntries(
          feature.options.map((option) => [option.name, option.description])
        )
      : null,
  }));

  const cleanedImages = data.images
    .filter((image) => image.value !== "")
    .map((image) => image.value);

  const cleanedData = {
    ...data,
    darkvision: cleanNumberNull(data.darkvision),
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
      concentration: "",
    },
    features: cleanedFeatures,
    skills: cleanedSkills,
    images: cleanedImages,
  };
  return cleanedData;
};
