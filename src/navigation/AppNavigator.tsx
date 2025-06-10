import {DarkTheme, NavigationContainer, Theme} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppLoading} from '~/components';
import {useNotificationAddedSubscription} from '~/hooks/live/useNotificationAddedSubscription';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {publicScreenOption} from '~/utils/utils';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {appCreateStackNavigator, navigationRef} from './methods';

export type AppNavigatorParamList = {
  Main: undefined;
  Auth: undefined;
};

const AppTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.BACKGROUND,
  },
};

const Stack = appCreateStackNavigator<AppNavigatorParamList>();

export default function AppNavigator() {
  const {isUserLoggedIn} = userDataStore(state => state);

  const userData = userDataStore(state => state?.userData);
  useNotificationAddedSubscription({
    userId: userData?.id,
    callback() {},
  });

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
      theme={AppTheme}
      ref={navigationRef}
      fallback={<AppLoading />}>
      <Stack.Navigator
        detachInactiveScreens={false}
        screenOptions={publicScreenOption}>
        {isUserLoggedIn ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
