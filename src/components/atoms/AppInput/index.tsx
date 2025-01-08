import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from '~/styles';
import {fontFamily as app_font, fontSize as fs} from '~/utils/style';
import {HStack} from '~/components';

export default React.forwardRef((props: AppInputProps, ref: any) => {
  const {
    placeholder = 'Tap to write',
    autoCapitalize = 'sentences',
    spellCheck = true,
    autoCorrect = true,
    multiline = false,
    fontSize = fs.xNormal,
    fontFamily = 'regular',
    style = styles.input,
    borderWidth = 0,
    borderBottomWidth = 1,
    borderColor = Colors.GARY_2,
    rounded = 12,
    minH = 58,
    px = 12,
    w = '100%',
    ...rest
  } = props;

  return (
    <HStack
      {...{
        borderWidth,
        borderBottomWidth,
        borderColor,
        rounded,
        w,
        minH,
        px,
        ...rest,
      }}>
      <TextInput
        {...rest}
        style={[
          {
            fontSize: fontSize,
            fontFamily: app_font[fontFamily],
          },
          style,
        ]}
        multiline={multiline}
        spellCheck={spellCheck}
        autoCorrect={autoCorrect}
        ref={ref}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
      />
    </HStack>
  );
});

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 0,
    height: '100%',
    flex: 1,
  },
});
