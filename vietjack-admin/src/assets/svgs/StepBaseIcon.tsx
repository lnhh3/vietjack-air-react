type Props = {
  width?: string;
  height?: string;
};
export const StepBaseIcon = ({ width = '24', height = '24' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11669_50921)">
        <rect width="24" height="24" rx="12" fill="white" />
        <circle cx="12" cy="12" r="4" fill="#EAECF0" />
        <rect
          x="0.75"
          y="0.75"
          width="22.5"
          height="22.5"
          rx="11.25"
          stroke="#EAECF0"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_11669_50921">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
