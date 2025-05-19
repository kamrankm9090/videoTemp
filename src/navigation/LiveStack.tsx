import React from 'react';
import {LiveScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';

export type LiveStackParamList = {
  Live: undefined;
};

const Stack = appCreateStackNavigator<LiveStackParamList>();

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
