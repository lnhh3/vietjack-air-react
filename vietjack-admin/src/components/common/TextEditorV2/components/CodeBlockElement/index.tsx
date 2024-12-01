import { FC } from 'react';
import { type RenderElementProps } from 'slate-react';

const CodeBlockElementComp: FC<RenderElementProps> = ({ children, attributes }) => {
  return <pre {...attributes}>{children}</pre>;
};

export default CodeBlockElementComp;
