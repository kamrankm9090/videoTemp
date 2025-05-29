import React, {FC} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AppHelperText, AppText, Box, VStack} from '~/components';
import {Colors} from '~/styles';

type PropsType = {
  length: number;
  name: string;
  color?: string;
  backgroundColor?: string;
  inputWidth?: any;
  size?: any;
};

const AppCodeInput: FC<PropsType> = ({
  length,
  name,
  color = Colors.GARY_3,
  backgroundColor = Colors.BACKGROUND,
  size = 45,
}) => {
  const {field, fieldState} = useController({name});

  const ref = useBlurOnFulfill({value: field.value, cellCount: length});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: field.value,
    setValue: field.onChange,
  });

  return (
    <VStack space={4}>
      <CodeField
        ref={ref}
        {...props}
        value={field.value}
        onChangeText={field.onChange}
        cellCount={length}
        rootStyle={styles.root}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => {
          const activeColor = isFocused ? Colors.PRIMARY : color;
          return (
            <Box
              key={index}
              w={size}
              h={size}
              mx={8}
              bg={backgroundColor}
              rounded={8}
              alignItems="center"
              alignSelf={'center'}
              borderWidth={1}
              borderColor={activeColor}
              justifyContent="center">
              <AppText
                fontFamily="medium"
                fontSize={20}
                color={activeColor}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </AppText>
            </Box>
          );
        }}
      />
      <AppHelperText error={fieldState.error} />
    </VStack>
  );
};

export default AppCodeInput;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
