import isHotkey from 'is-hotkey';
import { KeyboardEventHandler, useCallback } from 'react';
import { Editor } from 'slate';

import TextEditorHelper from '../TextEditorHelper';
import { HOT_KEYS } from '../utils';

const useOnKeydown = (editor: Editor) => {
  const onKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (isHotkey('tab', e)) {
        e.preventDefault();
        Editor.insertText(editor, '   ');
      }
      for (const hotkey in HOT_KEYS) {
        if (isHotkey(hotkey, e)) {
          e.preventDefault();
          const mark = HOT_KEYS[hotkey];
          TextEditorHelper.toggleMark(editor, mark);
        }
      }
    },
    [editor]
  );
  return onKeyDown;
};

export default useOnKeydown;
