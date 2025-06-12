import React from 'react';
import {useController} from 'react-hook-form';
import {AnimatedInput, AppHelperText, VStack} from '~/components';
import {Colors} from '~/styles';

type FormInputProps = {
  name: string;
  mandatory?: boolean;
  start?: JSX.Element;
  editable?: boolean;
} & AppInputProps;

export default React.forwardRef((props: FormInputProps, ref: any) => {
  const {name, mandatory, editable, start, ...rest} = props;

  const {field, fieldState} = useController({name});

  const borderColor = field.value ? Colors.INFO : Colors.GARY_3;

  return (
    <VStack space={4}>
      <AnimatedInput
        {...rest}
        borderColor={
          fieldState.error
            ? Colors.ERROR
            : editable
            ? borderColor
            : Colors.GARY_3
        }
        ref={ref}
        start={start}
        mandatory={mandatory}
        value={field.value}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
      />
      <AppHelperText error={fieldState.error} />
    </VStack>
  );
});
