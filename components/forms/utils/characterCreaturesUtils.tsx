import { Creature } from "../../../app/character/characterDefs";
import { CharacterCreatures } from "../definitions/characterCreaturesDefs";
import { cleanNumberNull } from "./formUtils";
export const generateDefaultValues = (creatures: Creature[]) => {
  return {
    data: creatures,
  };
};

export const cleanCharacterCreatures = (creatures: CharacterCreatures) => {
  return creatures.data.map(({ characterId, ...creature }) => ({
    ...creature,
    currentHP: creature.currentHP || creature.maxHP,
    passivePerception: cleanNumberNull(creature.passivePerception),
  }));
};
