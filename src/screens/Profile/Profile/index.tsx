import React from 'react';
import {AppButton, AppContainer, Center, ScreensHeader} from '~/components';
import {logout} from '~/utils/utils';

export default function ProfileScreen() {
  function logoutOnPress() {
    logout();
  }

  return (
    <AppContainer>
      <ScreensHeader title="Profile" />
      <Center>
        <AppButton mt={64} width="60%" title="Logout" onPress={logoutOnPress} />
      </Center>
    </AppContainer>
  );
}
