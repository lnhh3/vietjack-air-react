import { FC } from 'react';
import { type RenderLeafProps } from 'slate-react';

const Leaf: FC<RenderLeafProps> = ({ leaf, attributes, children }) => {
  const { text, ...rest } = leaf;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code className="px-2 bg-gray-200 rounded-md">{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }
  return (
    <span {...attributes} className={Object.keys(rest).join(' ')}>
      {children}
    </span>
  );
};

export default Leaf;
