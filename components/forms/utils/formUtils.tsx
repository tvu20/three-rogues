export const cleanNumber = (value: number) => {
  return isNaN(value) ? 0 : value ?? 0;
};

export const cleanNumberNull = (value: number | null) => {
  return value === null ? null : isNaN(value) ? null : value;
};

export const cleanStringNull = (value: string | null) => {
  return value === null || value === "" ? null : value;
};

export default cleanNumber;
