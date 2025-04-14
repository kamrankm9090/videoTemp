import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CreateScreen} from '~/screens';
import {publicScreenOption} from '~/utils/utils';

export type CreateStackParamList = {
  Create: undefined;
};

const Stack = createStackNavigator<CreateStackParamList>();

const screens = [
  {
    name: 'Create',
    component: CreateScreen,
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
