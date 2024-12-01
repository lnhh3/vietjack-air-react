import { FC, useCallback, useMemo } from 'react';
import { createEditor, type Descendant } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  type RenderElementProps,
  type RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';

import { cn } from '@/utilities/helper';

import EditorElement from './components/EditorElement';
import Leaf from './components/Leaf';
import ToolbarEditor from './components/ToolbarEditor';
import useDecorate from './hooks/useDecorate';
import useOnKeydown from './hooks/useOnKeydown';
import withHtml from './plugins/withHtml';
import withImage from './plugins/withImage';
import { toChildren } from './utils';

type Props = {
  initialValue?: Descendant[];
  className?: string;
  editorClassName?: string;
  readOnly?: boolean;
  onChange?: (value: Descendant[]) => void;
};

const init: Descendant[] = [
  {
    type: 'paragraph',
    children: toChildren(' '),
  },
];

const AppTextEditorV2: FC<Props> = ({
  initialValue = init,
  className,
  editorClassName,
  readOnly,
  onChange,
}) => {
  const editor = useMemo(() => withHtml(withImage(withReact(withHistory(createEditor())))), []);

  const decorate = useDecorate(editor);
  const handleKeyDown = useOnKeydown(editor);

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    []
  );

  return (
    <div className={cn('', className)}>
      <Slate onChange={onChange} editor={editor} initialValue={initialValue}>
        {!readOnly && <ToolbarEditor />}
        <Editable
          readOnly={readOnly}
          className={cn('outline-none mt-8', readOnly && 'mt-0', editorClassName)}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          spellCheck="false"
          onKeyDown={handleKeyDown}
          decorate={decorate}
        />
      </Slate>
    </div>
  );
};

export default AppTextEditorV2;
