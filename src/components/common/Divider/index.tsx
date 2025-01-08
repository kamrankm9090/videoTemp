import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Colors} from '~/styles';

interface Props {
  size?: number;
  style?: ViewStyle | ViewStyle[];
  orientation?: 'vertical' | 'horizontal';
  backgroundColor?: string;
  flex?: ViewStyle['flex'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  my?: ViewStyle['marginVertical'];
  mt?: ViewStyle['marginTop'];
  mb?: ViewStyle['marginBottom'];
  mx?: ViewStyle['marginHorizontal'];
}
export default function Divider({
  size = 1,
  style,
  backgroundColor = Colors.GARY_2,
  orientation = 'horizontal',
  flex,
  width = '100%',
  height,
  my,
  mt,
  mb,
  mx,
}: Props) {
  const viewStyle =
    orientation === 'horizontal'
      ? {
          flex,
          marginVertical: my,
          marginTop: mt,
          marginBottom: mb,
          width,
          height: size,
          backgroundColor,
        }
      : {flex, height, width: size, backgroundColor, marginHorizontal: mx};
  return <View style={[viewStyle, style]} />;
}
