import React from 'react';
import {FormProvider as Form, UseFormReturn} from 'react-hook-form';

type FormProviderType = {
  methods: UseFormReturn<any>;
  children?: ReactChildren;
};

export default function AppFormProvider({children, methods}: FormProviderType) {
  return <Form {...methods}>{children}</Form>;
}
