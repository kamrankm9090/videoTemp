import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ArrowRight} from '~/assets/svgs';
import {HStack, Divider, AppText, AppTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';

const duration = 300;
interface Option {
  title: string;
  onPress: () => void;
}

interface ButtonIconProps {
  options?: Option[];
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  options = [],
  icon,
  title,
  onPress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const accordionHeight = useSharedValue(0);
  const borderRadius = useSharedValue(scale(8)); // Initial border radius
  const isArrayOptions = options?.length > 0;

  const toggleAccordion = () => {
    if (isArrayOptions) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Open accordion and animate border radius
        accordionHeight.value = withTiming(options.length * scale(40), {
          duration,
        });
        borderRadius.value = withTiming(0, {duration});
      } else {
        // Close accordion and reset border radius
        accordionHeight.value = withTiming(0, {duration});
        borderRadius.value = withTiming(scale(8), {duration});
      }
    } else {
      onPress?.();
    }
  };

  // Animated styles for the accordion height
  const accordionStyle = useAnimatedStyle(() => ({
    height: accordionHeight.value,
    overflow: 'hidden',
  }));

  // Animated styles for the button borderRadius
  const buttonStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: borderRadius.value,
    borderBottomRightRadius: borderRadius.value,
  }));

  return (
    <View style={styles.container}>
      {/* Button with custom icon */}
      <Animated.View style={[styles.buttonAnim, buttonStyle]}>
        <AppTouchable style={styles.button} onPress={toggleAccordion}>
          <HStack space={scale(8)}>
            <View style={[styles.icon]}>{icon}</View>
            <AppText>{title}</AppText>
          </HStack>
          {!isArrayOptions && <ArrowRight />}
        </AppTouchable>
      </Animated.View>

      {/* Accordion for options */}
      {isArrayOptions && isOpen && (
        <Animated.View style={[styles.accordion, accordionStyle]}>
          {options?.map?.((option, index) => (
            <AppTouchable
              key={index}
              onPress={option.onPress}
              style={styles.optionWrapper}>
              <HStack justifyContent="space-between" alignItems="center">
                <AppText
                  fontFamily={fontFamily.light}
                  fontSize={fontSize.small}>
                  {option.title}
                </AppText>

                <ArrowRight />
              </HStack>
              {index < options?.length - 1 && <Divider mt={scale(10)} />}
            </AppTouchable>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
    paddingVertical: scale(20),
    width: '100%',
  },
  buttonAnim: {
    backgroundColor: Colors.PRIMARY_SECOND,
    width: '100%',
    borderRadius: scale(8),
  },
  icon: {
    backgroundColor: Colors.TRANSPARENT,
  },
  accordion: {
    backgroundColor: Colors.PRIMARY_SECOND,
    width: '100%',
    overflow: 'hidden',
    borderBottomEndRadius: scale(8),
    borderBottomStartRadius: scale(8),
  },
  optionWrapper: {
    paddingHorizontal: 15,
    paddingTop: scale(8),
    borderBottomColor: Colors.GARY_2,
    height: scale(40),
  },
});

export default memo(ButtonIcon);
