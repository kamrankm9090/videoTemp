import React from 'react';
import {publicScreenOption} from '~/utils/utils';
import CreateStack, {CreateStackParamList} from './CreateStack';
import HomeStack, {HomeStackParamList} from './HomeStack';
import MainTabs, {MainTabParamList} from './MainTabs';
import {appCreateStackNavigator} from './methods';
import OffersStack, {OffersStackParamList} from './OffersStack';
import CommunityStack, {CommunityStackParamList} from './CommunityStack';
import {CollaborativeScreen, CreateContentScreen, LiveScreen} from '~/screens';

export type MainStackParamList = {
  MainTabs: {
    screen?: keyof MainTabParamList;
  };
  // CreateStack?: {
  //   screen?: keyof CreateStackParamList;
  // };
  HomeStack?: {
    screen?: keyof HomeStackParamList;
  };
  OffersStack?: {
    screen?: keyof OffersStackParamList;
  };
  CommunityStack?: {
    screen?: keyof CommunityStackParamList;
  };
  CreateContent?: undefined;
  Live?: undefined;
};

const Stack = appCreateStackNavigator<MainStackParamList>();

const screens = [
  {
    name: 'MainTabs',
    component: MainTabs,
  },
  // {
  //   name: 'CreateStack',
  //   component: CreateStack,
  // },
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
  {
    name: 'CreateContent',
    component: CreateContentScreen,
  },
  {
    name: 'Collaborative',
    component: CollaborativeScreen,
  },
  {
    name: 'Live',
    component: LiveScreen,
  },
];

export default function MainStack() {
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
