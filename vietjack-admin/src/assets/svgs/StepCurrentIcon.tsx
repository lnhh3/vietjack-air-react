type Props = {
  width?: string;
  height?: string;
};

export const StepCurrentIcon = ({ width = '24', height = '24' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" fill="#EFF4FF" />
      <circle cx="12" cy="12" r="4" fill="#155EEF" />
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="11.25"
        stroke="#155EEF"
        strokeWidth="1.5"
      />
    </svg>
  );
};
