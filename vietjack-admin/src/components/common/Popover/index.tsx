import HeadlessTippy, { type TippyProps } from '@tippyjs/react/headless';
import { motion, useSpring } from 'framer-motion';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';

import { cn } from '@/utilities/helper';

type Props = {
  children?: ReactNode | ((params: { visible: boolean }) => ReactNode);
  renderClassName?: string;
  onChange?: (visible: boolean) => void;
} & Omit<TippyProps, 'children'>;

export type PopoverRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const Popover = forwardRef<PopoverRef, Props>(
  ({ children, render, renderClassName, onMount, onHide, onChange, ...props }, ref) => {
    const initialStyles = { opacity: 0, transformY: 10 };
    const config = { damping: 15, stiffness: 100 };
    const opacity = useSpring(initialStyles.opacity, config);
    const transformY = useSpring(initialStyles.transformY, config);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
        onChange?.(true);
      },
      close: () => {
        setVisible(false);
        onChange?.(false);
      },
      toggle: () => {
        setVisible((p) => !p);
        onChange?.(!visible);
      },
    }));

    const handlePopupMount: TippyProps['onMount'] = (e) => {
      opacity.set(1);
      transformY.set(0);

      onMount?.(e);
    };

    const handlePopupHide = ({ unmount }: any) => {
      opacity.set(0);
      transformY.set(10);
      const cleanup = opacity.on('animationComplete', () => {
        cleanup();
        unmount();
      });
      onHide?.({ unmount } as any);
    };

    const handleRender: TippyProps['render'] = (attrs, content, instance) => {
      return (
        <motion.div
          style={{ opacity, translateY: transformY }}
          className={cn(renderClassName)}
          {...attrs}
        >
          {typeof render === 'function' ? render?.(attrs, content, instance) : render}
        </motion.div>
      );
    };

    return (
      <HeadlessTippy
        visible={visible}
        // @ts-ignore
        appendTo={(e) => e.parentNode}
        placement="bottom"
        interactive
        animation={true}
        popperOptions={{
          strategy: 'fixed',
          ...props?.popperOptions,
        }}
        render={handleRender}
        {...props}
        onMount={handlePopupMount}
        onHide={handlePopupHide}
      >
        <div className="inline-block">
          {typeof children === 'function' ? children({ visible }) : children}
        </div>
      </HeadlessTippy>
    );
  }
);

Popover.displayName = 'Popover-comp';

export default Popover;
