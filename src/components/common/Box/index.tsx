import React from 'react';
import {View} from 'react-native';
import {generateShadowUsingNumber, globalStyles} from '~/utils/style';

export default function Box({
  children,
  style,
  flexDirection,
  flexGrow,
  opacity,
  borderStyle,
  flexWrap,
  flexShrink,
  m,
  mb,
  mt,
  ml,
  me,
  mr,
  ms,
  mx,
  my,
  p,
  pb,
  pt,
  pl,
  pr,
  ps,
  pe,
  px,
  py,
  bg,
  h,
  w,
  maxW,
  maxH,
  minH,
  minW,
  alignItems,
  alignSelf,
  justifyContent,
  flex,
  overflow,
  rounded,
  borderRadius,
  borderBottomEndRadius,
  borderBottomStartRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  borderTopRightRadius,
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderColor,
  borderBottomColor,
  borderTopColor,
  borderRightColor,
  borderLeftColor,
  borderStartColor,
  borderEndColor,
  borderWidth,
  borderBottomWidth,
  borderTopWidth,
  borderRightWidth,
  borderLeftWidth,
  borderStartWidth,
  borderEndWidth,
  left,
  right,
  start,
  end,
  top,
  bottom,
  position,
  zIndex,
  display,
  shadow,
  inverted,
  gap,
  rowGap,
  ...rest
}: StackProps) {
  const shadowStyle = shadow ? generateShadowUsingNumber(shadow) : undefined;
  const invertedStyle = inverted ? globalStyles.inverted : undefined;

  return (
    <View
      style={[
        {
          flexDirection,
          flexGrow,
          opacity,
          borderStyle,
          flexWrap,
          flexShrink,
          margin: m,
          marginBottom: mb,
          marginTop: mt,
          marginRight: mr,
          marginLeft: ml,
          marginStart: ms,
          marginEnd: me,
          marginHorizontal: mx,
          marginVertical: my,
          padding: p,
          paddingBottom: pb,
          paddingTop: pt,
          paddingRight: pr,
          paddingLeft: pl,
          paddingStart: ps,
          paddingEnd: pe,
          paddingHorizontal: px,
          paddingVertical: py,
          backgroundColor: bg,
          height: h,
          width: w,
          maxWidth: maxW,
          maxHeight: maxH,
          minHeight: minH,
          minWidth: minW,
          alignItems,
          alignSelf,
          justifyContent,
          flex,
          overflow,
          borderRadius: rounded ?? borderRadius,
          borderBottomStartRadius: borderBottomStartRadius,
          borderBottomEndRadius: borderBottomEndRadius,
          borderTopStartRadius,
          borderTopRightRadius: borderTopRightRadius,
          borderTopLeftRadius: borderTopLeftRadius,
          borderTopEndRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
          borderColor,
          borderBottomColor,
          borderTopColor,
          borderRightColor,
          borderLeftColor,
          borderStartColor: borderStartColor,
          borderEndColor: borderEndColor,
          borderWidth,
          borderBottomWidth,
          borderTopWidth,
          borderRightWidth,
          borderLeftWidth,
          borderStartWidth: borderStartWidth,
          borderEndWidth: borderEndWidth,
          right,
          left,
          start: start,
          end: end,
          top,
          bottom,
          position,
          zIndex,
          display,
          gap,
          rowGap,
        },
        shadowStyle,
        invertedStyle,
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
}
