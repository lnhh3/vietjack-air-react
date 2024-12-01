type Props = {
  width?: string;
  height?: string;
  color?: string;
};
export const CheckedBoxIcon = ({ width = '10', height = '8', color = '#ffffff' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1L3.5 6.5L1 4"
        stroke={color}
        strokeWidth="1.6666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
