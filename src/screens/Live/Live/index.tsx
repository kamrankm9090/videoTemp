import React from 'react';
import {Text} from 'react-native';
import {AppContainer, Center} from '~/components';

export default function LiveScreen() {
  return (
    <AppContainer>
      <Center flex={1}>
        <Text>Live</Text>
      </Center>
    </AppContainer>
  );
}
