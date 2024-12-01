import { FC } from 'react';
import { type RenderElementProps } from 'slate-react';

import { range } from '@/utilities/helper';

const heading = range(1, 7);

const HeadingBlockElement: FC<RenderElementProps> = ({ children, attributes, element }) => {
  const Heading =
    element.type === 'heading' && heading.includes(element.level) ? `h${element.level}` : 'p';

  // @ts-ignore
  const style = { textAlign: element.align };

  const headingClass = {
    h1: 'text-[32px] font-[600]',
    h2: 'text-[28px] font-[600]',
    h3: 'text-[24px] font-[600]',
    h4: 'text-[20px] font-[600]',
    h5: 'text-[16px] font-[600]',
    h6: 'text-[14px] font-[600]',
  };

  return (
    // @ts-ignore
    <Heading {...attributes} style={style} className={headingClass?.[`h${element.level}`]}>
      {children}
    </Heading>
  );
};

export default HeadingBlockElement;
