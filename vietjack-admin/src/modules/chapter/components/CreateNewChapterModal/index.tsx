import { Plus } from 'lucide-react';
import { forwardRef, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import MyButton from '@/components/common/Button';
import ChapterDropdown from '@/components/common/ChapterDropdown';
import CourseDropdown from '@/components/common/CourseDropdown';
import Input from '@/components/common/Input';
import Modal, { ModalRef } from '@/components/common/Modal';
import useNotificationStore from '@/hooks/useNotificationStore';
import { useQueryString } from '@/hooks/useQueryString';

import { ChapterRequest } from '../../apis/getChapter';
import { NewChapterRequest, useCreateNewChapter } from '../../apis/newChaptetr';

export type CreateNewChapterModalRef = {
  setVisible: (show: boolean) => void;
};

const CreateNewChapterPage = forwardRef<CreateNewChapterModalRef>(() => {
  const modalRef = useRef<ModalRef>(null);
  const { t } = useTranslation();
  const [{ courseId }] = useQueryString<ChapterRequest>();
  const { addNotification } = useNotificationStore();
  const { register, watch, setValue, handleSubmit, reset } = useForm<NewChapterRequest>({
    defaultValues: {
      courseId: courseId,
      previousChapterId: '',
      title: '',
    },
  });
  const { mutateAsync, isPending } = useCreateNewChapter();

  const handleCourseChange = (val?: string) => {
    setValue('courseId', val ?? '');
  };
  const handleChapterChange = (val?: string) => {
    setValue('previousChapterId', val ?? '');
  };

  const submit = async (values: NewChapterRequest) => {
    await mutateAsync({
      courseId: values.courseId,
      title: values.title,
      previousChapterId: values.previousChapterId || undefined,
    });
    addNotification({
      title: 'Create Notification successfully',
      type: 'success',
    });
    modalRef.current?.close();
  };

  return (
    <div className="mb-8">
      <MyButton leftIcon={<Plus />} onClick={() => modalRef.current?.open()}>
        {t`newChapter`}
      </MyButton>
      <Modal onClose={reset} ref={modalRef} modalClassName="bg-transparent">
        <form
          onSubmit={handleSubmit(submit)}
          className="min-w-[400px] rounded-lg bg-white px-4 py-5"
        >
          <h3 className="mb-4 text-md-semi-bold">{t`newChapter`}</h3>
          <div>
            <Input register={register('title')} label={t`title`}></Input>
          </div>
          <div>
            <CourseDropdown onChange={handleCourseChange} courseId={watch('courseId')} />
          </div>
          <div>
            <ChapterDropdown onChange={handleChapterChange} courseId={watch('courseId')} />
          </div>
          <div className="flex justify-end mt-5">
            <MyButton loading={isPending} type="submit">{t`create`}</MyButton>
          </div>
        </form>
      </Modal>
    </div>
  );
});

CreateNewChapterPage.displayName = 'CreateNewChapterPage';

export default CreateNewChapterPage;
