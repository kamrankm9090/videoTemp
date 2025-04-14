import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LiveScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type LiveStackParamList = {
  Live: undefined;
};

const Stack = createStackNavigator<LiveStackParamList>();

const screens = [
  {
    name: 'Live',
    component: LiveScreen,
  },
];

export default function LiveStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
