import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Colors} from '~/styles';
import {fontFamily as app_font, fontSize as fs} from '~/utils/style';

type Props = TextInputProps & {
  fontSize?: number;
  fontFamily?: keyof typeof app_font;
};

const AppInput = React.forwardRef<TextInput, Props>(
  (
    {
      style = styles.input,
      fontSize = fs.xNormal,
      fontFamily = 'regular',
      ...rest
    },
    ref,
  ) => {
    return (
      <TextInput
        ref={ref}
        {...rest}
        style={[
          styles.input,
          {
            fontSize,
            fontFamily: app_font[fontFamily],
          },
          style,
        ]}
      />
    );
  },
);

export default AppInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: Colors.WHITE,
  },
  flexDirection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
