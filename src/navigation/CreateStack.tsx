import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CreateScreen} from '~/screens';
import VideoPreviewerScreen from '~/screens/Create/VideoPreviewer';
import {publicScreenOption} from '~/utils/utils';

export type CreateStackParamList = {
  Create: {
    screen?: string;
    videoUrl?:string
  };
  VideoPreview: undefined;
};

const Stack = createStackNavigator<CreateStackParamList>();

const screens = [
  {
    name: 'Create',
    component: CreateScreen,
  },
  {
    name: 'VideoPreview',
    component: VideoPreviewerScreen,
  },
];

export default function CreateStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
