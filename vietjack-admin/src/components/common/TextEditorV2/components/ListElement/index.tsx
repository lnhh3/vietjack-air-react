import { type RenderElementProps } from 'slate-react';

function ListElement(props: RenderElementProps) {
  const { children, attributes, element } = props;

  const ListElement = element.type === 'bulleted-list' ? 'ul' : 'ol';

  const isList = element.type === 'bulleted-list' || element.type === 'numbered-list';

  return (
    <ListElement
      {...attributes}
      style={{
        listStyle: element.type === 'bulleted-list' ? 'disc' : 'decimal',
        textAlign: (isList && element.align) || 'left',
      }}
    >
      {children}
    </ListElement>
  );
}

export default ListElement;
