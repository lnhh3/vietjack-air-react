import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { FC } from 'react';

import { TextAlign } from '@/declare/slate';

type Props = {
  onClick: (type: TextAlign) => void;
};

const TextAlignmentPopup: FC<Props> = ({ onClick }) => {
  return (
    <div className="flex items-center gap-2 bg-white shadow-[rgba(149,157,165,0.2)_0px_8px_24px] px-3 py-2 rounded-md">
      <AlignLeft size={20} onClick={() => onClick('left')} />
      <AlignCenter size={20} onClick={() => onClick('center')} />
      <AlignRight size={20} onClick={() => onClick('right')} />
      <AlignJustify size={20} onClick={() => onClick('justify')} />
    </div>
  );
};

export default TextAlignmentPopup;
