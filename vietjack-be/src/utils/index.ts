import mongoose from 'mongoose';

export const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.toLowerCase())
    .join('_');
};

export const toSnakeCaseKey = <T>(obj: object): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCaseKey(v)) as T;
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        // @ts-ignore
        [toSnakeCase(key)]: toSnakeCaseKey(obj[key] as any),
      }),
      {},
    ) as T;
  }

  return obj as T;
};

export const toCamelCase = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.?)/g, (_, chr) => chr.toUpperCase());
};

export const toCamelCaseKey = <T>(obj: object): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCaseKey(v)) as T;
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        // @ts-ignore
        [toCamelCase(key)]: toCamelCaseKey(obj[key]),
      }),
      {},
    ) as T;
  }
  return obj as T;
};

export const isValidObjectId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id);

export const generateUniqueId = (length = 10): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};