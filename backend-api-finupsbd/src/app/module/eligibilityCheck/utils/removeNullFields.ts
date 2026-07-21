/* eslint-disable @typescript-eslint/no-explicit-any */
export const removeNullFields = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== null));
};
