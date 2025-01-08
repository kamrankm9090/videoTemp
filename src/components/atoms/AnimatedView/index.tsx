import React from 'react';
import {ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';

type AnimatedViewProps = {
  children?: ReactChildren;
  style?: ViewStyle | ViewStyle[];
  animation?: Animatable.Animation;
};

export default function AnimatedView({
  children,
  style,
  animation = 'fadeIn',
  ...res
}: AnimatedViewProps) {
  return (
    <Animatable.View {...res} animation={animation} style={style}>
      {children}
    </Animatable.View>
  );
}
