import React from 'react';
import useInitAgora from '~/hooks/agora/useInitAgora';
import {publicScreenOption} from '~/utils/utils';
import CommunityStack, {CommunityStackParamList} from './CommunityStack';
import CreateStack, {CreateStackParamList} from './CreateStack';
import HomeStack, {HomeStackParamList} from './HomeStack';
import MainTabs, {MainTabParamList} from './MainTabs';
import {appCreateStackNavigator} from './methods';
import OffersStack, {OffersStackParamList} from './OffersStack';

export type MainStackParamList = {
  MainTabs: {
    screen?: keyof MainTabParamList;
  };
  CreateStack?: {
    screen?: keyof CreateStackParamList;
  };
  HomeStack?: {
    screen?: keyof HomeStackParamList;
  };
  OffersStack?: {
    screen?: keyof OffersStackParamList;
  };
  CommunityStack?: {
    screen?: keyof CommunityStackParamList;
  };
};

const Stack = appCreateStackNavigator<MainStackParamList>();

const screens = [
  {
    name: 'MainTabs',
    component: MainTabs,
  },
  {
    name: 'CreateStack',
    component: CreateStack,
  },
  {
    name: 'HomeStack',
    component: HomeStack,
  },
  {
    name: 'OffersStack',
    component: OffersStack,
  },
  {
    name: 'CommunityStack',
    component: CommunityStack,
  },
];

export default function MainStack() {
  useInitAgora();
  return (
    <>
      <Stack.Navigator
        initialRouteName="MainTabs"
        detachInactiveScreens={false}
        screenOptions={publicScreenOption}>
        {screens.map(screen => (
          //@ts-ignore
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </>
  );
}
