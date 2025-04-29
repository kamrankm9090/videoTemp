import React from 'react';
import {AppTouchable} from '~/components';
import {Colors} from '~/styles';

export default function IconButton({
  onPress,
  children,
  bg = Colors.Nero_2,
  alignItems = 'center',
  justifyContent = 'center',
  rounded = 8,
  p = 18,
  ...rest
}: {onPress?: () => void} & AppTouchableProps) {
  return (
    <AppTouchable
      p={p}
      rounded={rounded}
      onPress={onPress}
      bg={bg}
      alignItems={alignItems}
      justifyContent={justifyContent}
      {...rest}>
      {children}
    </AppTouchable>
  );
}
