import HeadlessTippy, { TippyProps } from "@tippyjs/react/headless";
import { motion, useSpring } from "framer-motion";
import {
  forwardRef,
  ReactNode,
  RefObject,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Instance, Placement } from "tippy.js";

type AppPopoverProps = Omit<TippyProps, "render" | "children" | "ref"> & {
  children: ReactNode | (({ visible }: { visible: boolean }) => ReactNode);
  render: AppPopoverFunction | ReactNode;
  renderClassName?: string;
};

type AppPopoverFunction = (
  attrs: {
    "data-placement": Placement;
    "data-reference-hidden"?: string;
    "data-escaped"?: string;
  },
  content?: ReactNode,
  instance?: Instance,
) => ReactNode;

export type AppPopoverRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const AppPopover = forwardRef<AppPopoverRef, AppPopoverProps>(
  (
    {
      children,
      render,
      renderClassName,
      onMount,
      onHide,
      onClickOutside,
      onShow,
      ...props
    },
    ref,
  ) => {
    const initialStyles = { opacity: 0, transformY: 10 };
    const config = { damping: 15, stiffness: 100 };
    const opacity = useSpring(initialStyles.opacity, config);
    const transformY = useSpring(initialStyles.transformY, config);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
      toggle: () => {
        setVisible((p) => !p);
      },
    }));

    const handlePopupMount = (e: Instance) => {
      opacity.set(1);
      transformY.set(0);
      onMount?.(e);
    };

    const handlePopupHide = ({ unmount }: any) => {
      opacity.set(0);
      transformY.set(10);
      opacity.on("change", (latestValue) => {
        if (latestValue === 0) {
          unmount();
        }
      });
      onHide?.({ unmount } as any);
    };

    const handleRender: AppPopoverFunction = useCallback(
      (attrs, content, instance) => {
        return (
          <motion.div
            style={{ opacity, translateY: transformY }}
            className={renderClassName}
            {...attrs}
          >
            {typeof render === "function"
              ? render?.(attrs, content, instance)
              : render}
          </motion.div>
        );
      },
      [opacity, render, renderClassName, transformY],
    );

    return (
      <HeadlessTippy
        visible={visible}
        // @ts-ignore
        appendTo={(e) => e.parentNode}
        placement="bottom"
        interactive
        animation={true}
        onClickOutside={onClickOutside}
        popperOptions={{
          strategy: "fixed",
          ...props?.popperOptions,
        }}
        render={handleRender}
        {...props}
        onMount={handlePopupMount}
        onHide={handlePopupHide}
        onShow={onShow}
      >
        <div className="inline-block">
          {typeof children === "function" ? children({ visible }) : children}
        </div>
      </HeadlessTippy>
    );
  },
);

AppPopover.displayName = "AppPopover";

export default AppPopover;
