import React, { forwardRef, useEffect, useRef } from 'react';

const IndeterminateCheckbox = forwardRef<HTMLInputElement, { indeterminate?: boolean }>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate || false;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          className="h-4 w-4 !rounded-md !border !border-gray-300"
          type="checkbox"
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  }
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default IndeterminateCheckbox;
