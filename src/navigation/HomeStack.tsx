import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ContentViewerScreen, HomeScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type HomeStackParamList = {
  Home: undefined;
  ContentViewer:{
    item: any
  }
};

const Stack = createStackNavigator<HomeStackParamList>();

const screens = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'ContentViewer',
    component: ContentViewerScreen,
  },
];

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
