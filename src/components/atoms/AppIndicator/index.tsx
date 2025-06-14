import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ViewStyle,
} from 'react-native';
import {Colors} from '~/styles';

type Props = {
  size?: IndicatorSize;
  color?: string;
  position?: ViewStyle['position'];
  alignSelf?: ViewStyle['alignSelf'];
  top?: ViewStyle['top'];
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['top'];
  right?: ViewStyle['bottom'];
} & ActivityIndicatorProps;

export default function AppIndicator({
  size = 'small',
  color = Colors.PRIMARY,
  position,
  alignSelf,
  top,
  bottom,
  left,
  right,
  style,
  ...rest
}: Props) {
  return (
    <ActivityIndicator
      color={color}
      size={size}
      {...rest}
      style={[{position, alignSelf, bottom, top, left, right}, style]}
    />
  );
}
