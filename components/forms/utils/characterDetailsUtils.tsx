import { Character } from "../../../app/character/characterDefs";
import { CharacterDetails } from "../definitions/characterDetailsDefs";
import cleanNumber, { cleanNumberNull, cleanStringNull } from "./formUtils";

export const generateDefaultValues = (character: Character) => {
  const {
    weapons,
    spells,
    currency,
    inventory,
    creatures,
    author,
    authorId,
    createdAt,
    id,
    ...rest
  } = character;
  return {
    ...rest,
    liveStats: {
      hitDice: character.liveStats.hitDice.map((dice) => ({
        max: dice.max,
        type: dice.type,
      })),
      spellSlots: Object.fromEntries(
        Object.entries(character.liveStats.spellSlots).map(([key, value]) => [
          Number(key) - 1,
          value,
        ])
      ),
    },
    skills: Object.fromEntries(
      character.skills.map((skill) => [skill.name, skill])
    ),
    features: character.features.map((feature) => ({
      name: feature.name,
      class: feature.class,
      description: feature.description,
      level: feature.level,
      linkedAbility: feature.linkedAbility,
      max: feature.max,
      options: feature.options
        ? Object.entries(feature.options).map(([key, value]) => ({
            name: key,
            description: value,
          }))
        : null,
      resetsOn: feature.resetsOn,
      shortDescription: feature.shortDescription,
      source: feature.source,
      tracked: feature.tracked,
      used: feature.used,
    })),
    images: character.images.map((image) => ({
      value: image,
    })),
  };
};

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
    used: feature.used || 0,
    resetsOn: cleanStringNull(feature.resetsOn),
    options: feature.options?.length
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
