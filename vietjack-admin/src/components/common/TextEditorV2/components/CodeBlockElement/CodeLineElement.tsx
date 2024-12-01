import { FC } from 'react';
import { type RenderElementProps } from 'slate-react';

const CodeLineElement: FC<RenderElementProps> = ({ attributes, children }) => {
  return <div {...attributes}>{children}</div>;
};

export default CodeLineElement;
