type Props = {
  width?: string;
  height?: string;
};
export const StepCompleteIcon = ({ width = '24', height = '24' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11669_50902)">
        <rect width="24" height="24" rx="12" fill="#EFF4FF" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z"
          fill="#155EEF"
        />
        <rect
          x="0.75"
          y="0.75"
          width="22.5"
          height="22.5"
          rx="11.25"
          stroke="#155EEF"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_11669_50902">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
