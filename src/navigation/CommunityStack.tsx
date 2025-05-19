import React from 'react';
import {CommunityScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';

export type CommunityStackParamList = {
  Community: undefined;
};

const Stack = appCreateStackNavigator<CommunityStackParamList>();

const screens = [
  {
    name: 'Community',
    component: CommunityScreen,
  },
];

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
