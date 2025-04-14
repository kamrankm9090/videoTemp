import React from 'react';
import {StyleSheet} from 'react-native';
import {AppText, AppTouchable, VStack} from '~/components';
import {fontSize} from '~/utils/style';

export default function TabBarButton(props: any) {
  const {onPress, children, style = styles.container, text = ''} = props;

  return (
    <AppTouchable onPress={onPress} style={style}>
      <VStack space={4} alignItems="center">
        {children}
        {text && <AppText fontSize={fontSize.tiny}>{text}</AppText>}
      </VStack>
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});
