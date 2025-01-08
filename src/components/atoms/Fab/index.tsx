import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ChevronTop} from '~/assets/svgs';
import {Colors} from '~/styles';
import {generateShadowUsingNumber} from '~/utils/style';

export default function Fab({
  onPress,
  style,
  backgroundColor = Colors.PRIMARY,
  shadow = 4,
  size = 56,
  bottom = 30,
  left = 30,
  icon = <ChevronTop />,
}: FabProps) {
  const shadowStyle = shadow ? generateShadowUsingNumber(shadow) : undefined;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.fab,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          bottom,
          left,
          ...shadowStyle,
        },
        style,
      ]}>
      <View style={styles.iconContainer}>{icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
