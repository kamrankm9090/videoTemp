import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const color = props?.color || '#fff';
  const size = props?.size || 22;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

export default SvgComponent;
