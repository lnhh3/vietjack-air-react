import { ClassValue, clsx } from 'clsx';
import get from 'lodash/fp/get';
import { MutableRefObject, RefCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import { FalsyAble } from '@/types/common';
import { UserDetail } from '@/types/user';

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const generateId = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const replacePathDynamic = <T extends object>(url: string, obj?: T) => {
  return url
    .split('/')
    .map((item) => {
      if (item.startsWith(':')) {
        const key = item.slice(1);
        // @ts-ignore
        const value = obj?.[key] ?? item;
        return value;
      }
      return item;
    })
    .join('/');
};

export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  return (
    '#' +
    rgba
      .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((_, index) => !forceRemoveAlpha || index !== 3)
      .map((string) => parseFloat(string)) // Converts them to numbers
      .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      .map((number) => number.toString(16)) // Converts numbers to hex
      .map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
      .join('')
  );
};

export const hexToRgba = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getLanguageByExt = (name?: string) => {
  if (!name) return '';
  const nameSplitted = name.split('.');
  const currFile = nameSplitted[nameSplitted.length - 1];
  const file: { [key: string]: string } = {
    js: 'javascript',
    jsx: 'javascript',
    json: 'json',
    tsx: 'typescript',
    ts: 'typescript',
    css: 'css',
    scss: 'scss',
  };
  return currFile ? file[currFile] : '';
};

export const select = <O extends object>(
  key: keyof O | null | undefined,
  value: O & { _default: O[keyof O] }
): O[keyof O] => {
  return key === null || key === undefined ? value['_default'] : value[key];
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
      {}
    ) as T;
  }
  return obj as T;
};

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
      {}
    ) as T;
  }

  return obj as T;
};

export const isStringValid = (str: FalsyAble<string>) => {
  if (!str || str.trim() == '') {
    return false;
  }
  return true;
};

export const isFileNameValid = (str: FalsyAble<string>) => {
  if (!isStringValid(str) || (str && isStringStartWithNumber(str))) {
    return false;
  }
  return true;
};

export const isStringStartWithNumber = (str: string) => /^\d/.test(str);

export const getPropertyObject = <O extends object, K extends keyof O>(obj: O, k: K): O[K] =>
  get<O, K>(k)(obj);

export const limitString = (str?: FalsyAble<string>, limit = 20, endWidth = '...') => {
  if (!str) return '';
  if (str.length <= limit) return str;
  return str.slice(0, limit - endWidth.length) + endWidth;
};

type MutableRefList<T> = (RefCallback<T> | MutableRefObject<T> | undefined | null)[];

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs);
  };
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(val);
    } else if (ref != null) {
      ref.current = val;
    }
  });
}

export const templateString = ([first, ...strings]: TemplateStringsArray, ...values: any[]) =>
  values
    .reduce((acc, curr) => acc.concat(curr, strings.shift()), [first])
    .filter((x: any) => (x && x !== true) || x === 0)
    .join('');

export const formatUserTitle = (
  user: UserDetail | undefined | null,
  type: 'rtl' | 'ltr' = 'rtl'
) => {
  if (!user) {
    return '';
  }
  if (type === 'ltr') {
    return templateString`${user.lastName} ${user.firstName}`;
  }
  return templateString`${user.firstName} ${user.lastName}`;
};

export const formatNumber = (num: number | string, prefix = ',') => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, prefix);
};

formatNumber.getNativeNumber = (num: number | string) => {
  try {
    return +String(num).replace(/[^\d]/g, '');
  } catch (error) {
    console.log(`error:`, error);
    return 0;
  }
};

export function once(callback: (...args: any[]) => void) {
  let called = false;
  return (...args: any[]) => {
    if (!called) {
      called = true;
      callback(...args);
    }
  };
}

export const range = (start: number, end?: number, step = 1) => {
  try {
    const begin = end === undefined ? 0 : start;
    const finish = end === undefined ? start : end;
    const result = [];
    for (let i = begin; begin < finish ? i < finish : i > finish; i = step + i) {
      result.push(i);
    }
    return result;
  } catch (e) {
    return [];
  }
};

export const getUserTitle = (user: UserDetail) =>
  templateString`${user.firstName} ${user.lastName}` ||
  templateString`${user.username}` ||
  templateString`${user.email}`;
