import React from 'react';
import {StyleSheet} from 'react-native';
import {
  LinearGradient,
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {Colors} from '~/styles';

export default function AppGradientView({
  colors = [Colors.TRANSPARENT, Colors.BLACK],
  style = styles.defaultStyle,
  pointerEvents = 'none',
  ...rest
}: LinearGradientProps) {
  return (
    <LinearGradient
      {...rest}
      colors={colors}
      style={style}
      pointerEvents={pointerEvents}
    />
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 600,
    zIndex: 1,
  },
});
