import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Colors} from '~/styles';
import {fontFamily, fontSize as fs} from '~/utils/style';

export default function AppInput({
  style = styles.input,
  ...rest
}: TextInputProps) {
  return <TextInput {...rest} style={style} />;
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: Colors.WHITE,
    fontSize: fs.xNormal,
    fontFamily: fontFamily.regular,
  },
});
