import { useAuthStore } from '@authRemote/entry';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ChevronUp, Power } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatUserTitle } from '@/utilities/helper';

import Avatar from '../Avatar';
// import { useAuthInfo } from '@/apis';
// import { ELanguageResources } from '@/i18n';
// import { ETagColor } from '@/types';
// import { storage } from '@/utils';
import { Skeleton } from '../Skeleton';
// import Tag from '../Tag';
import styles from './style.module.scss';

const UserProfilePopup = () => {
  const { t } = useTranslation();
  const { userDetail: dataUser, isLoading, logout } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleLogOut = () => {
    logout();
    // navigate(ROUTER.authentication.login, { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setIsOpen]);

  return (
    <div className="relative min-w-[206px] max-w-xs" ref={ref}>
      <div
        role="presentation"
        className="flex h-[38px] cursor-pointer items-center justify-between gap-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex w-full items-center gap-2.5">
          {isLoading ? (
            <Skeleton parentClassName="p-0 w-auto" childClassName="w-8 h-8 rounded-lg" />
          ) : (
            <Avatar size={36} iconSize={24} src={dataUser?.profileImage} />
          )}

          <div className={styles.profileContent}>
            {isLoading ? (
              <Skeleton parentClassName="h-5 w-full p-1" />
            ) : (
              <div className="text-gray-700 truncate select-none text-sm-semi-bold">
                {formatUserTitle(dataUser)}
              </div>
            )}

            {isLoading ? (
              <Skeleton parentClassName="h-5 w-full p-1" />
            ) : (
              <div className="text-gray-600 truncate select-none text-xs-regular">
                {dataUser?.email}
              </div>
            )}
          </div>
        </div>

        <motion.div
          className="text-gray-500 shrink-0"
          animate={{
            rotateX: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp size={24} />
        </motion.div>
      </div>

      <motion.div
        className="absolute left-0 right-0 z-50 origin-top"
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 }}
      >
        <Transition
          show={isOpen}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          // @ts-ignore
          className="absolute right-0 z-50 mt-1 w-[400px] min-w-max rounded-lg border border-gray-200 bg-white"
        >
          <ul className="overflow-auto text-md-medium focus:outline-none">
            <li className="border-b first:rounded-t-lg">
              <button
                disabled
                className="relative flex items-center justify-between w-full gap-5 px-6 py-4 text-start"
              >
                <div className="flex w-full items-center gap-2.5">
                  {isLoading ? (
                    <Skeleton parentClassName="p-0 w-auto" childClassName="w-8 h-8 rounded-lg" />
                  ) : (
                    <Avatar size={52} />
                  )}

                  <div className={styles.profileContent}>
                    {isLoading ? (
                      <Skeleton parentClassName="h-5 w-full p-1" />
                    ) : (
                      <div className="text-gray-700 truncate select-none text-sm-semi-bold">
                        {dataUser?.username}
                      </div>
                    )}

                    {isLoading ? (
                      <Skeleton parentClassName="h-5 w-full p-1" />
                    ) : (
                      <div className="text-gray-600 truncate select-none text-xs-regular">
                        {dataUser?.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* <Tag name="Create" type={ETagColor.gray} /> */}
              </button>
            </li>

            {/* <li className="border-b rounded-b-lg text-sm-semi-bold text-primary-700">
              <button
                disabled
                className="flex items-center w-full gap-2 px-6 py-4 enabled:hover:bg-gray-25"
              >
                <UserPlus size={20} />

                {t('createNewAccount')}
              </button>
            </li>

            <li className="border-b rounded-b-lg text-sm-semi-bold text-primary-700">
              <button
                disabled
                className="flex items-center w-full gap-2 px-6 py-4 enabled:hover:bg-gray-25"
              >
                <CircleHelp size={20} />

                {t('help')}
              </button>
            </li> */}

            <li className="border-b rounded-b-lg text-sm-semi-bold text-primary-700">
              <button
                className="flex items-center w-full gap-2 px-6 py-4 rounded-b-lg text-sm-semi-bold text-error-600 enabled:hover:bg-gray-25"
                onClick={handleLogOut}
              >
                <Power size={20} />
                {t('signOut')}
              </button>
            </li>
          </ul>
        </Transition>
      </motion.div>
    </div>
  );
};

export default UserProfilePopup;
