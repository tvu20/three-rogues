export const cleanNumber = (value: number) => {
  return isNaN(value) ? 0 : value ?? 0;
};

export const cleanNumberNull = (value: number | null) => {
  return value === null ? null : isNaN(value) ? null : value;
};

export const cleanStringNull = (value: string | null) => {
  return value === null || value === "" || value === "null" ? null : value;
};

export const stringToBooleanNull = (value: string | null | boolean) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
};

export const booleanNullToString = (value: boolean | null | string) => {
  if (typeof value === "string") return value;

  if (value === true) return "true";
  if (value === false) return "false";
  return "null";
};

export default cleanNumber;
