import React from 'react';
import {View, ViewStyle} from 'react-native';
import {AppIndicator} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';

interface Props {
  style?: ViewStyle | ViewStyle[];
  size?: IndicatorSize;
  color?: string;
  safeArea?: boolean;
  backgroundColor?: ViewStyle['backgroundColor'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  top?: ViewStyle['top'];
  bottom?: ViewStyle['bottom'];
  position?: ViewStyle['position'];
  flex?: ViewStyle['flex'];
  zIndex?: ViewStyle['zIndex'];
  alignSelf?: ViewStyle['alignSelf'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
}

export default function AppLoading({
  style,
  size = 'large',
  color = Colors.PRIMARY,
  backgroundColor = Colors.WHITE_TRANSPARENT_1,
  width = '100%',
  height = '100%',
  top,
  bottom,
  safeArea = true,
  position = 'absolute',
  flex = 1,
  zIndex = 999,
  alignSelf = 'center',
  alignItems = 'center',
  justifyContent = 'center',
}: Props) {
  const {statusBarHeight} = useGetStatusBarHeight();

  return (
    <View
      style={[
        ...(safeArea ? [{top: isAndroid ? statusBarHeight : undefined}] : []),
        {
          backgroundColor,
          width,
          height,
          top,
          bottom,
          position,
          alignSelf,
          alignItems,
          justifyContent,
          zIndex,
          flex,
        },
        style,
      ]}>
      <AppIndicator color={color} size={size} />
    </View>
  );
}
