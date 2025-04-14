import {Colors} from '~/styles';
import {fontSize as font_size, fontFamily as app_font} from '~/utils/style';
import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {AppIndicator} from '~/components';

type Props = TextStyle &
  TextProps & {
    fontFamily?: keyof FontFamily;
    underline?: boolean;
    fontSize?: TextStyle['fontSize'];
    color?: TextStyle['color'];
    alignSelf?: TextStyle['alignSelf'];
    lineHeight?: TextStyle['lineHeight'];
    textAlign?: TextStyle['textAlign'];
    textAlignVertical?: TextStyle['textAlignVertical'];
    includeFontPadding?: boolean;
    marginBottom?: TextStyle['marginBottom'];
    marginTop?: TextStyle['marginTop'];
    marginHorizontal?: TextStyle['marginHorizontal'];
    marginLeft?: TextStyle['marginLeft'];
    marginRight?: TextStyle['marginRight'];
    marginVertical?: TextStyle['marginVertical'];
    margin?: TextStyle['margin'];
    padding?: TextStyle['padding'];
    paddingHorizontal?: TextStyle['paddingHorizontal'];
    paddingBottom?: TextStyle['paddingBottom'];
    paddingTop?: TextStyle['paddingTop'];
    width?: TextStyle['width'];
    flex?: TextStyle['flex'];
    flexShrink?: TextStyle['flexShrink'];
    letterSpacing?: TextStyle['letterSpacing'];
    opacity?: TextStyle['opacity'];
    borderRadius?: TextStyle['borderRadius'];
    borderStyle?: TextStyle['borderStyle'];
    borderBottomWidth?: TextStyle['borderBottomWidth'];
    borderBottomColor?: TextStyle['borderBottomColor'];
    zIndex?: TextStyle['zIndex'];
    backgroundColor?: TextStyle['backgroundColor'];
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode | string | number | Array<React.ReactNode>;
    height?: TextStyle['height'];
    numberOfLines?: number;
    isLoading?: boolean;
    fontWeight?: TextStyle['fontWeight'];
    onPress?: () => void;
    onLongPress?: () => void;
  };

export default function AppText(props: Props) {
  const {
    fontFamily = 'regular',
    underline,
    fontSize = font_size.normal,
    color = Colors.WHITE,
    alignSelf = 'auto',
    lineHeight,
    textAlign,
    textAlignVertical = 'auto',
    includeFontPadding = false,
    marginBottom = 0,
    paddingTop = 0,
    marginTop = 0,
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    margin,
    padding,
    paddingHorizontal,
    paddingBottom,
    width,
    flex,
    flexShrink,
    letterSpacing,
    opacity,
    borderRadius,
    children,
    borderStyle = 'solid',
    borderBottomWidth,
    borderBottomColor,
    zIndex,
    backgroundColor,
    style,
    height,
    numberOfLines,
    isLoading,
    fontWeight,
    onPress,
    onLongPress,
    ...rest
  } = props;

  const textDecorationLine = underline ? 'underline' : 'none';

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        ...(style ? [style] : []),
        {
          fontFamily: app_font[fontFamily],
          color,
          fontSize,
          textDecorationLine,
          alignSelf,
          lineHeight,
          textAlign: textAlign,
          textAlignVertical,
          includeFontPadding,
          marginBottom,
          marginTop,
          marginHorizontal,
          marginLeft,
          marginRight,
          marginVertical,
          margin,
          padding,
          paddingHorizontal,
          paddingBottom,
          paddingTop,
          width,
          flex,
          flexShrink,
          letterSpacing,
          borderRadius,
          opacity,
          textDecorationStyle: borderStyle,
          borderBottomWidth,
          borderBottomColor,
          zIndex,
          backgroundColor,
          height,
          fontWeight,
        },
      ]}
      {...{onPress, onLongPress}}
      {...rest}>
      {isLoading && <AppIndicator />}
      {children}
    </Text>
  );
}
