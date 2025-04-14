import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {Colors} from '~/styles';
import {fontFamily as app_font, fontSize as fs} from '~/utils/style';
import {AppTouchable} from '~/components';
import {Eye, EyeOff} from '~/assets/svgs';

type Props = TextInputProps & {
  label?: string;
  fontSize?: number;
  fontFamily?: keyof typeof app_font;
  borderColor?: string;
  labelColor?: string;
  keyboardType?: TextInputProps['keyboardType'];
};

const AnimatedText = Animated.createAnimatedComponent(Text);

const AppInput = React.forwardRef<TextInput, Props>(
  (
    {
      label,
      placeholder,
      fontSize = fs.xNormal,
      fontFamily = 'regular',
      style,
      value,
      onFocus,
      onBlur,
      borderColor = Colors.PRIMARY,
      labelColor = Colors.GARY_4,
      keyboardType,
      selectionColor = Colors.SEMI_TRANSPARENT,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [secureText, setSecureText] = useState<boolean>(true);
    const labelAnim = useSharedValue(value ? 1 : 0);
    const active = isFocused || value;
    const isPasswordType = keyboardType === 'visible-password';

    const handleFocus = (e: any) => {
      setIsFocused(true);
      labelAnim.value = withTiming(1, {duration: 150});
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      if (!value) {
        labelAnim.value = withTiming(0, {duration: 150});
      }
      onBlur?.(e);
    };

    function handleSecurePassword() {
      setSecureText(prevState => !prevState);
    }

    const labelStyle = useAnimatedStyle(() => {
      return {
        position: 'absolute',
        left: 12,
        top: interpolate(labelAnim.value, [0, 1], [14, -8]),
        fontSize: interpolate(labelAnim.value, [0, 1], [fs.xNormal, 12]),
        color: isFocused ? labelColor : Colors.GARY_4,
        fontFamily: app_font.medium,
        backgroundColor: active ? Colors.BACKGROUND : Colors.TRANSPARENT,
        paddingHorizontal: active ? 4 : 0,
      };
    });

    return (
      <View style={[styles.container, {borderColor}]}>
        <AnimatedText style={labelStyle}>{label ?? placeholder}</AnimatedText>
        <TextInput
          {...rest}
          ref={ref}
          value={value}
          style={[
            styles.input,
            {
              fontSize,
              fontFamily: app_font[fontFamily],
            },
            style,
          ]}
          onFocus={handleFocus}
          selectionColor={selectionColor}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          secureTextEntry={isPasswordType ? secureText : false}
        />
        {isPasswordType && (
          <AppTouchable onPress={handleSecurePassword}>
            {secureText ? (
              <EyeOff height={20} width={20} fill={Colors.GARY_3} />
            ) : (
              <Eye />
            )}
          </AppTouchable>
        )}
      </View>
    );
  },
);

export default AppInput;

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.GARY_2,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: Colors.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.WHITE,
  },
});
