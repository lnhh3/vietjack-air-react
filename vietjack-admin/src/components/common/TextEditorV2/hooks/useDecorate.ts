import { useCallback } from 'react';
import { Editor, Element } from 'slate';

const useDecorate = (editor: Editor) => {
  return useCallback(
    // @ts-ignore
    ([node, path]) => {
      if (Element.isElement(node) && node.type === 'code-line') {
        // @ts-ignore
        const ranges = editor.nodeToDecorations.get(node) || [];
        return ranges;
      }
      return [];
    },
    // @ts-ignore
    [editor.nodeToDecorations]
  );
};
export default useDecorate;
