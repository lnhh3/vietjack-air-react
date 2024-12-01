import { useState } from 'react';
import { useSlate } from 'slate-react';

import { range } from '@/utilities/helper';

import { DropdownStandard } from '../../DropdownStandard';
import TextEditorHelper from '../TextEditorHelper';

const DropdownHeading = () => {
  const editor = useSlate();
  const [value, setValue] = useState(0);

  return (
    <DropdownStandard
      containerClassName="w-[140px] border-none"
      dropdownClassName="border-none"
      options={range(0, 7).map((item) => ({
        label: item === 0 ? `Normal` : `Heading ${item}`,
        value: item,
      }))}
      defaultValue={0}
      placeholder="Normal"
      selectedValue={value}
      showClearIcon
      onChange={(item) => {
        setValue(+(item ?? 0));
        TextEditorHelper.toggleHeadingBlock(editor, !item ? 0 : (Number(item) as any));
      }}
    />
  );
};

export default DropdownHeading;
