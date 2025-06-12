import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function DepositIcon(props: SvgProps) {
  const color = props?.color || '#fff';
  const height = props?.height || 25;
  const width = props?.width || 24;
  return (
    <Svg
      height={height}
      width={width}
      viewBox="0 0 24 25"
      fill="none"
      {...props}>
      <Path
        d="M11.68 15.87c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l2.03-2.03-2.03-2.03a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.56 2.56c.29.29.29.77 0 1.06l-2.56 2.56c-.14.15-.34.22-.53.22z"
        fill={color}
      />
      <Path
        d="M14.17 13.31H4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10.17c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill={color}
      />
      <Path
        d="M12 4.297c2.444 0 4.488.852 5.92 2.283 1.431 1.432 2.283 3.476 2.283 5.92s-.851 4.488-2.283 5.92c-1.432 1.431-3.476 2.283-5.92 2.283a.209.209 0 01-.203-.203c0-.108.095-.203.203-.203 2.266 0 4.222-.793 5.613-2.184 1.391-1.39 2.184-3.347 2.184-5.613 0-2.266-.793-4.222-2.184-5.613-1.39-1.391-3.347-2.184-5.613-2.184a.209.209 0 01-.203-.203c0-.108.095-.203.203-.203z"
        fill={color}
        stroke={color}
        strokeWidth={1.09375}
      />
    </Svg>
  );
}

export default DepositIcon;
