import { FC } from 'react';
import { type RenderElementProps } from 'slate-react';

const ListItemElement: FC<RenderElementProps> = ({ attributes, children }) => {
  return (
    <li {...attributes} className="mb-2 ml-8">
      {children}
    </li>
  );
};

export default ListItemElement;
