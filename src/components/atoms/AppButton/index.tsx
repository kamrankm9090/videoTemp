import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import {AppIndicator, AppText, Box, HStack, Center} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontWeight, fontSize as fs} from '~/utils/style';

interface Props {
  title: string | null;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  outline?: boolean;
  color?: string;
  disableColor?: string;
  disableTextColor?: string;
  borderColor?: ViewStyle['borderColor'];
  textColor?: string;
  backgroundColor?: ViewStyle['backgroundColor'];
  spinnerColor?: string;
  spinnerSize?: IndicatorSize;
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  borderRadius?: ViewStyle['borderRadius'];
  fontSize?: number;
  font_family?: any;
  font_weight?:any;
  mt?: ViewStyle['marginTop'];
  mb?: ViewStyle['marginBottom'];
  mx?: ViewStyle['marginHorizontal'];
  px?: ViewStyle['paddingHorizontal'];
  py?: ViewStyle['paddingVertical'];
  numberOfLines?: number;
  shadow?: number;
  leftIcon?: JSX.Element;
  flex?: number;
  underline?: boolean;
  hasWidth?: boolean;
  borderWidth?: ViewStyle['borderWidth'];
  leftIconPosition?: ViewStyle['position'];
  space?: number;
  minW?: ViewStyle['minWidth'];
}

export default function AppButton({
  title,
  loading,
  disabled,
  onPress,
  outline = false,
  color = Colors.PRIMARY,
  disableColor = Colors.DISABLE,
  disableTextColor = Colors.GARY_5,
  borderColor,
  textColor = Colors.WHITE,
  backgroundColor = Colors.TRANSPARENT,
  spinnerColor = Colors.WHITE,
  spinnerSize = 'small',
  width = '100%',
  height = 48,
  borderRadius = 8,
  fontSize = fs.small,
  font_family = fontFamily.bold,
  font_weight = fontWeight.medium,
  mt,
  mb,
  mx,
  px,
  py,
  numberOfLines,
  shadow,
  leftIcon,
  flex,
  underline,
  hasWidth = true,
  borderWidth,
  leftIconPosition = 'absolute',
  space = 16,
  minW,
}: Props) {
  function onPressHandler() {
    onPress?.();
  }

  const AppTextColor = outline
    ? color
    : textColor
    ? textColor
    : disabled
    ? disableTextColor
    : Colors.BLACK;

  return (
    <Box
      alignItems="center"
      mt={mt}
      mb={mb}
      mx={mx}
      px={px}
      py={py}
      minW={minW}
      w={hasWidth ? width : undefined}
      flex={flex}
      h={height}
      overflow={shadow ? undefined : 'hidden'}
      borderRadius={borderRadius}
      shadow={outline ? undefined : shadow}
      bg={outline ? backgroundColor : disabled ? disableColor : color}
      borderWidth={outline ? borderWidth : borderWidth ? borderWidth : 0}
      borderColor={outline ? borderColor : color ? color : undefined}>
      <TouchableOpacity
        style={[{...(hasWidth && {width}), height, flex}]}
        onPress={onPressHandler}
        disabled={loading || disabled}
        activeOpacity={0.7}>
        <Center flex={1}>
          {loading ? (
            <AppIndicator size={spinnerSize} color={spinnerColor} />
          ) : (
            <HStack
              space={space}
              justifyContent="center"
              w="100%"
              alignItems="center">
              {leftIcon && (
                <Box
                  left={leftIconPosition === 'absolute' ? 16 : undefined}
                  position={leftIconPosition}>
                  {leftIcon}
                </Box>
              )}
              <AppText
                underline={underline}
                textAlign="center"
                numberOfLines={numberOfLines}
                fontSize={fontSize}
                fontFamily={font_family}
                fontWeight={font_weight}
                color={AppTextColor}>
                {title}
              </AppText>
            </HStack>
          )}
        </Center>
      </TouchableOpacity>
    </Box>
  );
}
