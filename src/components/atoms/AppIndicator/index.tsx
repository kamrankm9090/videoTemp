import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {Colors} from '~/styles';

type Props = {
  size?: IndicatorSize;
  color?: string;
} & ActivityIndicatorProps;

export default function AppIndicator({
  size = 'small',
  color = Colors.PRIMARY,
  ...rest
}: Props) {
  return <ActivityIndicator color={color} size={size} {...rest} />;
}
