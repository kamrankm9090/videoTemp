import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {OffersScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type OffersStackParamList = {
  Offers: undefined;
};

const Stack = createStackNavigator<OffersStackParamList>();

const screens = [
  {
    name: 'Offers',
    component: OffersScreen,
  },
];

export default function OffersStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
