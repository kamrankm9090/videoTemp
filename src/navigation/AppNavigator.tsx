import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {HomeScreen} from '~/screens';
import {navigationRef} from './methods';

export type AppNavigatorParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const navigatorOptions = {
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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
