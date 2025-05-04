import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ContentViewerLiveScreen, ContentViewerScreen, LiveEndedScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type HomeStackParamList = {
  ContentViewer: {
    item: any;
  };
  ContentViewerLive: {
    liveId: number;
  };
  LiveEnded:undefined
};

const Stack = createStackNavigator<HomeStackParamList>();

const screens = [
  {
    name: 'ContentViewer',
    component: ContentViewerScreen,
  },
  {
    name: 'ContentViewerLive',
    component: ContentViewerLiveScreen,
  },
  {
    name: 'LiveEnded',
    component: LiveEndedScreen,
  },
];

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
