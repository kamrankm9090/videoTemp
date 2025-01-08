import React from 'react';
import {StyleSheet} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

export default function AppKeyboardAwareScrollView(
  props: KeyboardAwareScrollViewProps,
) {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={
        props?.contentContainerStyle ?? styles.contentContainerStyle
      }
      {...props}>
      {
        //@ts-ignore
        props.children
      }
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
