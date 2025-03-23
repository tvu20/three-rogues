export const cleanNumber = (value: number) => {
  return isNaN(value) ? 0 : value ?? 0;
};

export default cleanNumber;
