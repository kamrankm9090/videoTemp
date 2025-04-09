import React from 'react';
import {useController} from 'react-hook-form';
import {AppInput, VStack, AppHelperText} from '~/components';
import {Colors} from '~/styles';

type FormInputProps = {
  name: string;
} & AppInputProps;

export default React.forwardRef((props: FormInputProps, ref: any) => {
  const {name, ...rest} = props;

  const {field, fieldState} = useController({name});

  return (
    <VStack space={4}>
      <AppInput
        {...rest}
        borderColor={
          fieldState.error
            ? Colors.ERROR
            : field.value
            ? Colors.INFO
            : Colors.GARY_3
        }
        ref={ref}
        value={field.value}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
      />
      <AppHelperText error={fieldState.error} />
    </VStack>
  );
});
