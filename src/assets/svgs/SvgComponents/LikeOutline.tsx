import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export default function LikeOutline(props: SvgProps) {
  return (
    <Svg {...props} width={25} height={25} fill="none">
      <Path
        stroke="#C9C9C9"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m7.75 18.963 3.1 2.4c.4.4 1.3.6 1.9.6h3.8c1.2 0 2.5-.9 2.8-2.1l2.4-7.3c.5-1.4-.4-2.6-1.9-2.6h-4c-.6 0-1.1-.5-1-1.2l.5-3.2c.2-.9-.4-1.9-1.3-2.2-.8-.3-1.8.1-2.2.7l-4.1 6.1"
      />
      <Path
        stroke="#C9C9C9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.65 18.963v-9.8c0-1.4.6-1.9 2-1.9h1c1.4 0 2 .5 2 1.9v9.8c0 1.4-.6 1.9-2 1.9h-1c-1.4 0-2-.5-2-1.9Z"
      />
    </Svg>
  );
}
