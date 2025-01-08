import React from 'react';
import {Text} from 'react-native';
import {AppContainer, Center} from '~/components';

export default function HomeScreen() {
  return (
    <AppContainer>
      <Center flex={1}>
        <Text>Home</Text>
      </Center>
    </AppContainer>
  );
}
