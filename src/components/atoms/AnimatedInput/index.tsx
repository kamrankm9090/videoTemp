import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Eye, EyeOff} from '~/assets/svgs';
import {AppInput, AppText, AppTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontFamily as app_font, fontSize as fs} from '~/utils/style';

type Props = TextInputProps & {
  label?: string;
  fontSize?: number;
  fontFamily?: keyof typeof app_font;
  borderColor?: string;
  labelColor?: string;
  keyboardType?: TextInputProps['keyboardType'];
  containerStyle?: ViewStyle | ViewStyle[];
  textArea?: boolean;
  height?: ViewStyle['height'];
  backgroundColor?: ViewStyle['backgroundColor'];
  editable?: boolean;
  disableColor?: string;
  mandatory?: boolean;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedInput = React.forwardRef<TextInput, Props>(
  (
    {
      label,
      placeholder,
      fontSize = fs.xNormal,
      fontFamily = 'regular',
      style,
      containerStyle = styles.container,
      value,
      onFocus,
      onBlur,
      borderColor = Colors.PRIMARY,
      labelColor = Colors.GARY_4,
      keyboardType,
      selectionColor = Colors.SEMI_TRANSPARENT,
      textArea,
      height = 48,
      editable = true,
      backgroundColor = Colors.TRANSPARENT,
      disableColor = Colors.Nero_2,
      mandatory,
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

    const background = !editable
      ? disableColor
      : containerStyle?.backgroundColor || Colors.BACKGROUND;
    const inputHeight = textArea ? 120 : height;

    const labelStyle = useAnimatedStyle(() => {
      return {
        position: 'absolute',
        left: 12,
        top: interpolate(labelAnim.value, [0, 1], [14, -8]),
        fontSize: interpolate(labelAnim.value, [0, 1], [fs.xNormal, 12]),
        color: !editable
          ? Colors.Dim_Gray
          : isFocused
          ? labelColor
          : Colors.GARY_4,
        fontFamily: app_font.medium,
        backgroundColor: active ? background : Colors.TRANSPARENT,
        paddingHorizontal: active ? 4 : 0,
      };
    });

    const bgColor = useMemo(() => {
      return editable ? backgroundColor : disableColor;
    }, [editable, disableColor, backgroundColor]);

    return (
      <View
        style={[
          containerStyle,
          {borderColor, height: inputHeight, backgroundColor: bgColor},
        ]}>
        <AnimatedText style={labelStyle}>
          {label ?? placeholder}
          {mandatory && (
            <AppText fontFamily="bold" color={Colors.PRIMARY}>
              {'  *'}
            </AppText>
          )}
        </AnimatedText>
        <AppInput
          {...rest}
          ref={ref}
          editable={editable}
          value={value}
          style={[
            styles.input,
            {
              fontSize,
              fontFamily: app_font[fontFamily],
            },
            style,
          ]}
          multiline={textArea}
          textAlignVertical={textArea ? 'top' : 'center'}
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

export default AnimatedInput;

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GARY_2,
    paddingHorizontal: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.WHITE,
    textAlignVertical: 'top',
    height: '100%',
  },
});
