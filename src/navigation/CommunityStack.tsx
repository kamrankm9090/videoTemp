import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CommunityScreen} from '~/screens';
import RequestersScreen from '~/screens/Community/Requesters';
import {publicScreenOption} from '~/utils/utils';

export type CommunityStackParamList = {
  Community: undefined;
  Requesters:undefined
};

const Stack = createStackNavigator<CommunityStackParamList>();

const screens = [
  {
    name: 'Community',
    component: CommunityScreen,
  },
  {
    name: 'Requesters',
    component: RequestersScreen,
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
