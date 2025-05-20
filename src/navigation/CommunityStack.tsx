import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CommunityInfoScreen, CommunityScreen, RequestersScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type CommunityStackParamList = {
  Community: undefined;
  Requesters:undefined
  CommunityInfo:undefined
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
   {
    name: 'CommunityInfo',
    component: CommunityInfoScreen,
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
