import React from 'react';
import {AppContainer, AppHeader, SettingActivity} from '~/components';
import {Colors} from '~/styles';

const SettingsActivityScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Setting Activity"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <SettingActivity />
    </AppContainer>
  );
};

export default SettingsActivityScreen;
