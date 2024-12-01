import { times } from 'lodash';
import { ImagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { UploadFileType, useUploadFile } from '@/apis/upload';
import MyButton from '@/components/common/Button';
import { DropdownStandard, TDropdownOption } from '@/components/common/DropdownStandard';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/Textarea';
import { AppRoutes } from '@/constants';
import { NewCourseRequest } from '@/types/course';
import { formatNumber } from '@/utilities/helper';

import { useCreateNewCourse } from '../../apis/createNewCourse';
import CourseContentModal from '../CourseContentModal';

const NewCourseData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutateAsync } = useCreateNewCourse({});

  const handleChange = (file: File) => {
    setFile(file);
  };

  const optionsDiscount: TDropdownOption[] = times(10).map((item) => ({
    label: item === 0 ? '0%' : `${item * 10}%`,
    value: (item * 10) / 100 || '0%',
  }));
  const fileTypes = ['JPG', 'PNG', 'GIF'];

  const { mutateAsync: uploadFile, isPending: isUploadFileLoading } = useUploadFile();
  const { register, setValue: setFieldValue, handleSubmit } = useForm<NewCourseRequest>({});

  const submit = async (value: NewCourseRequest) => {
    const formData = new FormData();
    formData.append('image', file as any);

    const { publicId } = await uploadFile({
      type: UploadFileType.COURSE,
      file: formData,
    });

    mutateAsync({
      ...value,
      thumbnailUrl: publicId,
      price: formatNumber.getNativeNumber(value.price),
    });
    navigate(AppRoutes.COURSES.INDEX);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
    return () => {
      file && previewUrl && URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    };
  }, [file]);

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-[720px] flex flex-col gap-6">
      <p className="mb-8 text-gray-900 text-xl-bold">{t('letMakeNewCourse')}!</p>
      <Input
        required
        register={register('title')}
        label={t('titleOfCourse')}
        className="w-ful"
        inputClassName="h-[40px]"
        placeholder="Eg: React"
      />
      <TextArea
        required
        register={register('description')}
        label={t('description')}
        className="w-ful"
        inputClassName="h-[80px]"
        placeholder="Eg: Framework for Front-end"
      />

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className={twMerge('mb-1.5 !text-sm-medium text-gray-700')}>{t`price`}</div>
          <Input
            register={register('price')}
            value={formatNumber(value)}
            className="w-full"
            inputClassName="h-[40px]"
            rightSection={<p>VND</p>}
            placeholder="Eg: Framework for Front-end"
            onChange={(e) => {
              const inputValue = e.target.value;
              const plainNumber = formatNumber.getNativeNumber(inputValue);
              setValue(plainNumber + '');
            }}
          />
        </div>
        <div>
          <div className={twMerge('mb-1.5 !text-sm-medium text-gray-700')}>{t`discount`}</div>
          <DropdownStandard
            defaultValue={'0%'}
            containerClassName="min-w-[100px]"
            onChange={(a) => {
              if (!a) return;
              if (typeof a === 'string' && a === '0%') setFieldValue('discount', 0);
              else setFieldValue('discount', a as any);
            }}
            options={optionsDiscount}
          />
        </div>
      </div>
      <div>
        <div className={twMerge('mb-1 !text-sm-medium text-gray-700')}>{t`content`}</div>
        <CourseContentModal onClose={(value) => setFieldValue('content', JSON.stringify(value))} />
      </div>
      <div>
        <div className={twMerge('mb-1.5 !text-sm-medium text-gray-700')}>
          {t`thumbnail`}
          <span className="text-error-500">&nbsp;*</span>
        </div>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
          <div className="flex items-center gap-4 p-6 border border-dashed border-gray-300 rounded-[8px]">
            <ImagePlus size={36} />
            <p className="text-gray-700 text-sm-medium">{t`dragYourPictureHere`}</p>
          </div>
        </FileUploader>
        {previewUrl && (
          <div className="self-start inline-block mt-6 overflow-hidden border border-gray-300 rounded-lg">
            <img className="h-[300px] object-cover" src={previewUrl} alt="" />
          </div>
        )}
        <div className="flex justify-end">
          <MyButton loading={isUploadFileLoading} className="mt-6" type="submit">
            {t`continue`}
          </MyButton>
        </div>
      </div>
    </form>
  );
};

export default NewCourseData;
