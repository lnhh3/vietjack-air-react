import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useSlate } from 'slate-react';

import Popover, { PopoverRef } from '@/components/common/Popover';
import { TextAlign } from '@/declare/slate';

import TextEditorHelper from '../../TextEditorHelper';
import TextAlignmentPopup from './TextAlignmentPopup';

const align = {
  left: <AlignLeft size={20} />,
  right: <AlignRight size={20} />,
  center: <AlignCenter size={20} />,
  justify: <AlignJustify size={20} />,
};

const TextAlignElement = () => {
  const popoverRef = useRef<PopoverRef>(null);
  const editor = useSlate();
  const [alignKey, setAlign] = useState<TextAlign>('left');

  const render = useCallback(
    () => (
      <TextAlignmentPopup
        onClick={(val) => {
          setAlign(val);
          TextEditorHelper.toggleTextAlignBlock(editor, val);
          popoverRef.current?.close();
        }}
      />
    ),
    []
  );

  return (
    <div className="inline-block">
      <Popover onClickOutside={() => popoverRef.current?.close()} ref={popoverRef} render={render}>
        <button type="button" onClick={() => popoverRef.current?.toggle()}>
          {align[alignKey]}
        </button>
      </Popover>
    </div>
  );
};

export default TextAlignElement;
