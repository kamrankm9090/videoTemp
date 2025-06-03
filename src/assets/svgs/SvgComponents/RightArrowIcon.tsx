import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function RightArrowIcon(props: SvgProps) {
  const color = props?.color || '#fff';
  const height = props?.height || 16;
  const width = props?.width || 17;
  return (
    <Svg
      height={height}
      width={width}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.47 11.94l3.98-3.98-3.98-3.98"
        stroke={color}
        strokeWidth={1.3268}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
