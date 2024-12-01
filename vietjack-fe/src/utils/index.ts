import clsx, { ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

import { FormatDate } from "@/types/common";

export const cn = (...input: ClassValue[]) => twMerge(clsx(...input));
export const isSSR = () => typeof window === "undefined";

export function formatMoney(
  amount: string | number = 0,
  decimalCount = 2,
  decimal = ".",
  thousands = ",",
) {
  decimalCount = Math.abs(decimalCount);
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

  const negativeSign = Number(amount) < 0 ? "-" : "";

  const i = parseInt(
    (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
  ).toString();
  const j = i.length > 3 ? i.length % 3 : 0;

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
    (decimalCount
      ? decimal +
        Math.abs(Number(amount) - Number(i))
          .toFixed(decimalCount)
          .slice(2)
      : "")
  );
}

export function formatDate(
  date: string | Date | null,
  format: string | FormatDate = FormatDate.DEFAULT,
) {
  if (!date) {
    return "";
  }
  let newDate = date;
  if (typeof date === "string") {
    newDate = new Date(date);
    if (newDate.toString() === "Invalid Date") {
      newDate = new Date(moment(date, format).toDate());
    }
  }
  return moment(newDate).format(format);
}

export const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.toLowerCase())
    .join("_");
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
