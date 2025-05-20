import React from 'react';
import {ProfileScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';

export type ProfileStackParamList = {
  Profile: undefined;
};

const Stack = appCreateStackNavigator<ProfileStackParamList>();

const screens = [
  {
    name: 'Profile',
    component: ProfileScreen,
  },
];

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
