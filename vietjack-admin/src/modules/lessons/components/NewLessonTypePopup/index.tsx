import { FileQuestion, Plus, ScrollText, TvMinimalPlay } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import MyButton from '@/components/common/Button';
import Popover, { PopoverRef } from '@/components/common/Popover';

type LessonType = 'video' | 'document' | 'question';

const NewLessonTypePopup = () => {
  const { t } = useTranslation();

  const popoverRef = useRef<PopoverRef>(null);

  const lessonType = [
    {
      title: 'video',
      icon: <TvMinimalPlay size={20} />,
    },
    {
      title: 'document',
      icon: <ScrollText size={20} />,
    },
    {
      title: 'question',
      icon: <FileQuestion size={20} />,
    },
  ];

  const handleClick = (type: LessonType) => {
    alert(`You clicked on lesson type: ${type}`);
  };

  const renderPopup = useCallback(
    () => (
      <div className="flex flex-col">
        {lessonType.map((item) => (
          <button
            onClick={() => handleClick(item.title as LessonType)}
            tabIndex={-1}
            key={item.title}
            className="px-4 py-2.5 w-full text-left transition-all flex items-center cursor-pointer gap-4 opacity-80 hover:opacity-100 hover:bg-gray-100 text-md-medium"
          >
            {item.icon}
            <span>{t(item.title)}</span>
          </button>
        ))}
      </div>
    ),
    []
  );

  return (
    <Popover
      onClickOutside={() => popoverRef.current?.close()}
      ref={popoverRef}
      render={renderPopup}
      renderClassName="bg-white shadow-[rgba(149,157,165,0.2)_0px_8px_24px] min-w-[200px] rounded-[4px] overflow-hidden"
      placement="bottom-start"
    >
      <MyButton leftIcon={<Plus />} onClick={() => popoverRef.current?.open()}>
        {t`newLesson`}
      </MyButton>
    </Popover>
  );
};

export default NewLessonTypePopup;
