import React from 'react';
import {AppContainer, AppHeader} from '~/components';
import {Colors} from '~/styles';

const PasswordSettingScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Password setting"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
    </AppContainer>
  );
};

export default PasswordSettingScreen;
