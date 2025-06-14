import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function BookmarkFillIcon(props: SvgProps) {
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
        d="M16.82 2H7.18C5.05 2 3.32 3.74 3.32 5.86v14.09c0 1.8 1.29 2.56 2.87 1.69l4.88-2.71c.52-.29 1.36-.29 1.87 0l4.88 2.71c1.58.88 2.87.12 2.87-1.69V5.86C20.68 3.74 18.95 2 16.82 2zm-1.81 7.75c-.97.35-1.99.53-3.01.53-1.02 0-2.04-.18-3.01-.53a.75.75 0 01-.45-.96c.15-.39.58-.59.97-.45 1.61.58 3.38.58 4.99 0a.75.75 0 11.51 1.41z"
        fill={color}
      />
    </Svg>
  );
}

export default BookmarkFillIcon;
