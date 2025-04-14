import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  ForgotPasswordScreen,
  ResetPasswordScreen,
  ResetPasswordSuccessScreen,
  SelectCategoryScreen,
  SigninScreen,
  SignupScreen,
  SignupSigninScreen,
  SignupSuccessScreen,
  VerificationCodeScreen,
} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type AuthStackParamList = {
  SignupSignin: undefined;
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  VerificationCode: undefined;
  SignupSuccess: undefined;
  SelectCategory: undefined;
  ResetPassword: undefined;
  ResetPasswordSuccess: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

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
    name: 'SignupSuccess',
    component: SignupSuccessScreen,
  },
  {
    name: 'SelectCategory',
    component: SelectCategoryScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  },
  {
    name: 'ResetPasswordSuccess',
    component: ResetPasswordSuccessScreen,
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
