import React from 'react';
import {CommunityDetailScreen, CommunityInfoScreen, CommunityScreen, CommunitySearchScreen, RequestersScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';

export type CommunityStackParamList = {
  Community: undefined;
  Requesters:undefined
  CommunityInfo:undefined
  CommunityDetail: undefined
  CommunitySearch: undefined
};

const Stack = appCreateStackNavigator<CommunityStackParamList>();

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
  {
    name: 'CommunityDetail',
    component: CommunityDetailScreen,
  },
   {
    name: 'CommunitySearch',
    component: CommunitySearchScreen,
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
