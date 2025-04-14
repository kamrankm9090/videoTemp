import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CommunityScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type CommunityStackParamList = {
  Community: undefined;
};

const Stack = createNativeStackNavigator<CommunityStackParamList>();

const screens = [
  {
    name: 'Community',
    component: CommunityScreen,
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
