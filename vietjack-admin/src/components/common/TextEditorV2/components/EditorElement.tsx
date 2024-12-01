import { FC } from 'react';
import { type RenderElementProps } from 'slate-react';

import CodeBlockElementComp from './CodeBlockElement';
import CodeLineElement from './CodeBlockElement/CodeLineElement';
import HeadingBlockElement from './HeadingBlockElement';
import ListElement from './ListElement';
import ListItemElement from './ListElement/ListItemElement';

const EditorElement: FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'heading':
      return <HeadingBlockElement {...props} />;
    case 'list-item':
      return <ListItemElement {...props} />;
    case 'bulleted-list':
    case 'numbered-list':
      return <ListElement {...props} />;
    case 'code-block':
      return <CodeBlockElementComp {...props} />;
    case 'code-line':
      return <CodeLineElement {...props} />;
  }

  const style = { textAlign: element.align };

  return (
    <p style={style} {...attributes}>
      {children}
    </p>
  );
};

export default EditorElement;
