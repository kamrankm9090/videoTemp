import React from 'react';
import {
  CollaborativeScreen,
  ContentViewerLiveScreen,
  CreateContentScreen,
  LiveScreen,
} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';
import {AgoraProvider} from 'App';

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
  // {
  //   name: 'ContentViewerLive1',
  //   component: ContentViewerLiveScreen,
  // },
];

export default function CreateStack() {
  return (
    <AgoraProvider enableVideo={true}>
      <Stack.Navigator
        detachInactiveScreens={false}
        screenOptions={publicScreenOption}>
        {screens.map(screen => (
          //@ts-ignore
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </AgoraProvider>
  );
}
