import { ArrowLeft } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { type Descendant } from 'slate';

import Modal, { ModalRef } from '@/components/common/Modal';
import AppTextEditorV2 from '@/components/common/TextEditorV2';
import { toChildren } from '@/components/common/TextEditorV2/utils';

type Props = {
  onClose?: (value: Descendant[]) => void;
};

const CourseContentModal: FC<Props> = ({ onClose }) => {
  const modalRef = useRef<ModalRef>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: toChildren('// You can start here'),
    },
  ]);

  return (
    <div className="relative border !border-gray-300 rounded-lg px-8 py-8 max-h-[200px] overflow-hidden">
      <button type="button" className="w-full" onClick={() => modalRef.current?.open()}>
        {!isOpen && <AppTextEditorV2 initialValue={value} readOnly />}
      </button>
      <Modal
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        ref={modalRef}
        fullScreen
      >
        <div className="px-8 py-6">
          <button
            type="button"
            onClick={() => {
              modalRef.current?.close();
              onClose?.(value);
            }}
          >
            <ArrowLeft />
          </button>
          <AppTextEditorV2
            onChange={setValue}
            initialValue={value}
            className="mt-4"
            editorClassName="max-w-[750px] mx-auto"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CourseContentModal;
