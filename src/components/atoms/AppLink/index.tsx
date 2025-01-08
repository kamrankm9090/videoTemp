import React from 'react';
import {Linking} from 'react-native';
import {AppText, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize as font_size} from '~/utils/style';

export default function AppLink({
  text,
  onPress,
  link,
  mb,
  mt,
  p,
  m,
  color = Colors.INFO,
  fontSize = font_size.xNormal,
  fontFamily = 'regular',
  underline = true,
  leftIcon,
}: AppLinkProps) {
  function onPressHandler() {
    if (onPress) {
      onPress?.();
    } else {
      link && Linking.openURL(link);
    }
  }

  return (
    <AppTouchable {...{mb, mt, p, m}} onPress={onPressHandler}>
      <HStack alignItems="center" space={4}>
        {leftIcon}
        <AppText
          underline={underline}
          fontFamily={fontFamily}
          fontSize={fontSize}
          color={color}>
          {text}
        </AppText>
      </HStack>
    </AppTouchable>
  );
}
