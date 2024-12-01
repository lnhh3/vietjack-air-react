import imageExt from 'image-extensions';
import isUrl from 'is-url';
import { Element, Text } from 'slate';

export const HOT_KEYS: Record<string, any> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const toChildren = (content: string = ''): Text[] => [{ text: content }];
export const toCodeLines = (content: string): Element[] =>
  content.split('\n').map((line) => ({ type: 'code-line', children: toChildren(line) }));

export const isImageUrl = (url: string | null | undefined) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  if (!ext) return false;
  return imageExt.includes(ext);
};
