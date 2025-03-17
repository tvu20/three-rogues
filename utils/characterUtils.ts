export const getAbilityModifier = (ability: number) => {
  return Math.floor((ability - 10) / 2);
};
