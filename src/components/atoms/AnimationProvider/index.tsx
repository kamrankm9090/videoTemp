import React, {memo, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useKeyboardVisible} from '~/hooks';
import {fontSize, scale} from '~/utils/style';
import AppText from '../AppText';
import {Colors} from '~/styles';
import AppTouchable from '../AppTouchable';

interface AnimationProviderProps {
  visibleChildren?: React.ReactNode;
  inVisibleChildren?: React.ReactNode;
  onPress?: () => void;
  visibleText?: string;
}

const AnimationProvider: React.FC<AnimationProviderProps> = ({
  visibleChildren,
  inVisibleChildren,
  onPress,
  visibleText = 'CONTINUE',
}) => {
  const {isKeyboardVisible, keyboardHeight} = useKeyboardVisible();

  // Shared values for animations
  const visibleOpacity = useSharedValue(0);
  const inVisibleOpacity = useSharedValue(1);
  const animatedBottom = useSharedValue(0);

  const animationConfig = {duration: 300}; // Common animation config

  useEffect(() => {
    visibleOpacity.value = withTiming(
      isKeyboardVisible ? 1 : 0,
      animationConfig,
    );
    inVisibleOpacity.value = withTiming(
      isKeyboardVisible ? 0 : 1,
      animationConfig,
    );
    animatedBottom.value = withTiming(
      isKeyboardVisible ? keyboardHeight - scale(40) : 0,
      animationConfig,
    );
  }, [isKeyboardVisible, keyboardHeight]);

  // Animated styles
  const visibleStyle = useAnimatedStyle(() => ({
    opacity: visibleOpacity.value,
    bottom: animatedBottom.value,
  }));

  const inVisibleStyle = useAnimatedStyle(() => ({
    opacity: inVisibleOpacity.value,
  }));

  return (
    <>
      <Animated.View style={[styles.buttonWrapper, visibleStyle]}>
        {visibleChildren ?? (
          <AppTouchable onPress={onPress} style={styles.touchable}>
            <AppText fontSize={fontSize.xNormal} color={Colors.INFO}>
              {visibleText}
            </AppText>
          </AppTouchable>
        )}
      </Animated.View>
      <Animated.View style={[styles.inVisibleWrapper, inVisibleStyle]}>
        {inVisibleChildren}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    right: scale(0),
    zIndex: 1000,
  },
  inVisibleWrapper: {},
  touchable: {
    padding: scale(10),
  },
});

export default memo(AnimationProvider);
