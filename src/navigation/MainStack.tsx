import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {publicScreenOption} from '~/utils/utils';
import MainTabs from './MainTabs';
import CreateStack from './CreateStack';

export type MainStackParamList = {
  MainTabs: {
    screen?: MainTabScreensParams;
  };
  CreateStack?: {
    screen?: CreateStackScreensParams;
  };
};

export type MainTabScreensParams =
  | 'HomeTab'
  | 'OffersTab'
  | 'CreateTab'
  | 'CommunityTab'
  | 'ProfileTab';

export type CreateStackScreensParams = 'CreateContent' | 'Collaborative';

const Stack = createStackNavigator<MainStackParamList>();

const screens = [
  {
    name: 'MainTabs',
    component: MainTabs,
  },
  {
    name: 'CreateStack',
    component: CreateStack,
  },
];

export default function MainStack() {
  return (
    <>
      <Stack.Navigator screenOptions={publicScreenOption}>
        {screens.map(screen => (
          //@ts-ignore
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </>
  );
}
