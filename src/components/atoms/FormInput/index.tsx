import React from 'react';
import {useController} from 'react-hook-form';
import {AppInput, VStack, AppHelperText} from '~/components';

type FormInputProps = {
  name: string;
} & AppInputProps;

export default React.forwardRef((props: FormInputProps, ref: any) => {
  const {name, ...rest} = props;

  const {field, fieldState} = useController({name});

  return (
    <VStack>
      <AppInput
        {...rest}
        ref={ref}
        value={field.value}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
      />
      <AppHelperText error={fieldState.error} />
    </VStack>
  );
});
