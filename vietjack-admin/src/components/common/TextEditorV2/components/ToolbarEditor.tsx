import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { useSlate } from 'slate-react';

import TextEditorHelper from '../TextEditorHelper';
import DropdownHeading from './DropdownHeading';
import MarkButton from './MarkButton';
import TextAlignElement from './TextAlignElement';

const ToolbarEditor = () => {
  const editor = useSlate();

  return (
    <div className="inline-flex items-center gap-4 px-6 py-1 rounded-lg">
      <MarkButton icon={<Bold size={20} />} type="bold" />
      <MarkButton icon={<Italic size={20} />} type="italic" />
      <MarkButton icon={<Underline size={20} />} type="underline" />
      <MarkButton icon={<Code size={20} />} type="code" />
      <MarkButton icon={<Strikethrough size={20} />} type="strikethrough" />
      <div className="w-[5px] h-full bg-red-500"></div>
      <DropdownHeading />
      <TextAlignElement />
      <button
        type="button"
        onClick={() => TextEditorHelper.toggleListBlock(editor, 'bulleted-list')}
      >
        <List size={20} />
      </button>
      <button
        type="button"
        onClick={() => TextEditorHelper.toggleListBlock(editor, 'numbered-list')}
      >
        <ListOrdered size={20} />
      </button>
      <button
        type="button"
        onClick={() => TextEditorHelper.toggleListBlock(editor, 'numbered-list')}
      >
        <SquareCode size={20} />
      </button>
    </div>
  );
};

export default ToolbarEditor;
