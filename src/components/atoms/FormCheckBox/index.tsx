import React from 'react';
import {useController} from 'react-hook-form';
import {BouncyCheckboxProps} from 'react-native-bouncy-checkbox';
import {AppCheckBox, AppHelperText, VStack} from '~/components';

type FormBouncyCheckBoxProps = {
  name: string;
  description?: string;
} & BouncyCheckboxProps;

const FormCheckBox = React.forwardRef(
  (props: FormBouncyCheckBoxProps, ref: any) => {
    const {name, description, ...rest} = props;

    const {field, fieldState} = useController({name});

    return (
      <VStack space={4}>
        <AppCheckBox
          {...rest}
          ref={ref}
          description={description}
          isChecked={field.value}
          onPress={field.onChange}
        />
        <AppHelperText error={fieldState.error} />
      </VStack>
    );
  },
);

export default FormCheckBox;
