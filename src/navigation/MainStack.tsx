import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {publicScreenOption} from '~/utils/utils';
import MainTabs from './MainTabs';

export type MainStackParamList = {
  MainTabs: {
    screen?: MainTabScreensParams;
  };
};

export type MainTabScreensParams = 'HomeTab' | 'LiveTab';

const Stack = createStackNavigator<MainStackParamList>();

const screens = [
  {
    name: 'MainTabs',
    component: MainTabs,
  },
];

export default function MainStack() {
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
