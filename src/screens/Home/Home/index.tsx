import React from 'react';
import {Text} from 'react-native';
import {PlayCircle} from '~/assets/svgs';
import {AppContainer} from '~/components';

export default function HomeScreen() {
  return (
    <AppContainer>
      <Text>Home</Text>
      <PlayCircle />
    </AppContainer>
  );
}
