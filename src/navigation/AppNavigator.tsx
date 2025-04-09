import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppLoading} from '~/components';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {navigationRef} from './methods';

export type AppNavigatorParamList = {
  Main: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const navigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function AppNavigator() {
  const hideSplash = useCallback(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  useEffect(() => {
    hideSplash();
  }, [hideSplash]);

  return (
    <NavigationContainer
      theme={DarkTheme}
      ref={navigationRef}
      fallback={<AppLoading />}>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
