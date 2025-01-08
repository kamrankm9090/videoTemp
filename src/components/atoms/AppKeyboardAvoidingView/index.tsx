import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {isIos} from '~/utils/helper';

type Props = {
  children: ReactChildren;
  iosKeyboardVerticalOffset?: number;
  androidKeyboardVerticalOffset?: number;
} & KeyboardAvoidingViewProps;

export default function AppKeyboardAvoidingView({
  children,
  iosKeyboardVerticalOffset = 60,
  androidKeyboardVerticalOffset = 25,
  ...rest
}: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        {...rest}
        collapsable
        keyboardVerticalOffset={
          isIos ? iosKeyboardVerticalOffset : androidKeyboardVerticalOffset
        }
        behavior={isIos ? 'padding' : 'height'}
        style={styles.flex1}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
