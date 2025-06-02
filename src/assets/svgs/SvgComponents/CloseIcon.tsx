import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function CloseIcon(props: SvgProps) {
  const color = props?.color || '#fff';
  const height = props?.height || 22;
  const width = props?.width || 22;

  return (
    <Svg
      height={height}
      width={width}
      viewBox="0 0 22 21"
      fill="none"
      {...props}>
      <Path
        d="M5.874 15.175l9.8-9.8a.326.326 0 01.452 0 .326.326 0 010 .451l-9.8 9.8a.326.326 0 01-.452 0 .326.326 0 010-.451z"
        stroke={color}
        strokeWidth={1.09375}
      />
      <Path
        d="M5.874 5.374a.326.326 0 01.452 0l9.8 9.8a.326.326 0 010 .452.326.326 0 01-.452 0l-9.8-9.8a.326.326 0 010-.452z"
        stroke={color}
        strokeWidth={1.09375}
      />
    </Svg>
  );
}
