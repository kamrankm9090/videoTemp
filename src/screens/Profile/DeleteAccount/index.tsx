import React from 'react';
import {AppContainer, AppHeader} from '~/components';
import {Colors} from '~/styles';

const DeleteAccountScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Delete Account"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
    </AppContainer>
  );
};

export default DeleteAccountScreen;
