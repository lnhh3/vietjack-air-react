import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';

import { cn } from '@/utilities/helper';

type Props = {
  children: ReactNode;
  modalClassName?: string;
  backdropClassName?: string;
  fullScreen?: boolean;
  onOpen?(): void;
  onClose?(): void;
};

export type ModalRef = {
  open(): void;
  close(): void;
};
const Modal = forwardRef<ModalRef, Props>(
  ({ children, backdropClassName, modalClassName, fullScreen, onClose, onOpen }, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
      onOpen?.();
    };

    const handleClose = () => {
      setOpen(false);
      onClose?.();
    };

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              'fixed top-0 bottom-0 left-0 right-0 z-[999999999] flex items-center justify-center'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                'absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]',
                backdropClassName
              )}
              onClick={handleClose}
            ></motion.div>
            <motion.div
              className={cn(
                'bg-white z-199 absolute',
                fullScreen && 'top-0 bottom-0 left-0 right-0',
                modalClassName
              )}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
