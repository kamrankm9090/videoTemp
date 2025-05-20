import React from 'react';
import {CollaborativeScreen, CreateContentScreen, LiveScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';

export type CreateStackParamList = {
  Collaborative?: undefined;
  Live?: undefined;
  CreateContent: undefined;
};

const Stack = appCreateStackNavigator<CreateStackParamList>();

const screens = [
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

export default function CreateStack() {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
