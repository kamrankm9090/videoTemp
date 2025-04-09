import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  SignupScreen,
  SignupSigninScreen,
  SigninScreen,
  ForgotPasswordScreen,
  VerificationCodeScreen,
  SignupSuccessScreen,
  EmailVerificationScreen,
  SelectCategoryScreen,
} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type AuthStackParamList = {
  SignupSignin: undefined;
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  VerificationCode: undefined;
  EmailVerification: undefined;
  SignupSuccess: undefined;
  SelectCategory: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const screens = [
  {
    name: 'SignupSignin',
    component: SignupSigninScreen,
  },
  {
    name: 'Signup',
    component: SignupScreen,
  },
  {
    name: 'Signin',
    component: SigninScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
  {
    name: 'VerificationCode',
    component: VerificationCodeScreen,
  },
  {
    name: 'EmailVerification',
    component: EmailVerificationScreen,
  },
  {
    name: 'SignupSuccess',
    component: SignupSuccessScreen,
  },
  {
    name: 'SelectCategory',
    component: SelectCategoryScreen,
  },
];

export default function AuthStack() {
  return (
    <>
      <Stack.Navigator screenOptions={publicScreenOption}>
        {screens.map(screen => (
          //@ts-ignore
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </>
  );
}
