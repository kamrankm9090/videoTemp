import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function WithdrawIcon(props: SvgProps) {
  const color = props?.color || '#fff';
  const height = props?.height || 24;
  const width = props?.width || 24;
  return (
    <Svg
      height={height}
      width={width}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M17.44 15.37c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l2.03-2.03-2.03-2.03a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.56 2.56c.29.29.29.77 0 1.06l-2.56 2.56c-.15.15-.34.22-.53.22z"
        fill={color}
      />
      <Path
        d="M19.93 12.81H9.76c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10.17c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill={color}
      />
      <Path
        d="M11.76 3.797c.108 0 .203.095.203.203a.209.209 0 01-.203.203c-2.266 0-4.222.793-5.614 2.184C4.756 7.777 3.963 9.734 3.963 12c0 2.266.792 4.222 2.183 5.613 1.392 1.391 3.348 2.184 5.614 2.184.108 0 .203.095.203.203a.209.209 0 01-.203.203c-2.444 0-4.489-.851-5.92-2.283-1.432-1.432-2.283-3.476-2.283-5.92s.851-4.488 2.283-5.92C7.27 4.65 9.316 3.797 11.76 3.797z"
        fill={color}
        stroke={color}
        strokeWidth={1.09375}
      />
    </Svg>
  );
}

export default WithdrawIcon;
