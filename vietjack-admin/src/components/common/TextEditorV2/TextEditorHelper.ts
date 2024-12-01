import { Editor, Element, Text, Transforms } from 'slate';

import { ListElement, TextAlign } from '@/declare/slate';

class TextEditorHelper {
  isMarkActive = (editor: Editor, format: keyof Omit<Text, 'text'>) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  toggleMark = (editor: Editor, format: keyof Omit<Text, 'text'>) => {
    const isActive = this.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  isBlockActive = (editor: Editor, format: Element['type']) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
      })
    );

    return !!match;
  };

  isHeadingBlockActive(editor: Editor, level: number) {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'heading' && n.level === level,
      })
    );

    return !!match;
  }

  toggleHeadingBlock(editor: Editor, level: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
    const isActive = this.isHeadingBlockActive(editor, level);
    if (!isActive)
      Transforms.setNodes(editor, {
        type: level === 0 ? 'paragraph' : 'heading',
        level: level === 0 ? undefined : level,
      });
    else {
      Transforms.setNodes(editor, {
        type: 'paragraph',
      });
    }
  }

  isTextAlignActive(editor: Editor, align: TextAlign) {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n.type !== 'list-item' &&
          n.type !== 'code-block' &&
          n.type !== 'code-line' &&
          n.align === align,
      })
    );
    return !!match;
  }

  toggleTextAlignBlock(editor: Editor, align: TextAlign) {
    const isActive = this.isTextAlignActive(editor, align);
    if (isActive && align !== 'left') {
      Transforms.setNodes(editor, {
        align: 'left',
      });
    } else if (!isActive) {
      Transforms.setNodes(editor, {
        align: align,
      });
    }
  }

  isListActive(editor: Editor, list: ListElement['type']) {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n.type === 'bulleted-list' || n.type === 'numbered-list') &&
          n.type === list,
      })
    );
    return !!match;
  }

  toggleListBlock(editor: Editor, list: ListElement['type']) {
    const isActive = this.isListActive(editor, list);

    const isList = list === 'bulleted-list' || list === 'numbered-list';

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        isList &&
        (n.type === 'bulleted-list' || n.type === 'numbered-list'),
      split: true,
    });
    Transforms.setNodes<Element>(editor, {
      type: !isActive && isList ? 'list-item' : 'paragraph',
    });
    if (!isActive && isList) {
      Transforms.wrapNodes(editor, {
        type: list,
        children: [],
      });
    }
  }

  isCodeBlockActive(editor: Editor) {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code-block',
      })
    );
    return !!match;
  }

  toggleCodeBlock(_: Editor) {
    // const isActive = this.isCodeBlockActive(editor);
  }
}

export default new TextEditorHelper();
