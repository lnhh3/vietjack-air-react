import { type BaseEditor, type Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export type CodeLineElement = {
  type: 'code-line';
  children: CustomText[];
};

export type CodeBlockElement = {
  type: 'code-block';
  children: CustomText[];
};

type ListElement = {
  type: 'numbered-list' | 'bulleted-list';
  align?: TextAlign;
  children: Descendant[];
};

type ListItemElement = {
  type: 'list-item';
  children: Descendant[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: TextAlign;
  children: CustomText[];
};

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingElement = {
  type: 'heading';
  level: HeadingLevel;
  align?: TextAlign;
  children: CustomText[];
};

type CustomElement =
  | ParagraphElement
  | HeadingElement
  | ListElement
  | ListItemElement
  | CodeLineElement
  | CodeBlockElement;

type EmptyText = {
  text: string;
};

type CustomText = {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
