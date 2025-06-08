import React from 'react';
import {AppContainer, AppHeader} from '~/components';
import {Colors} from '~/styles';

const AnalyticsScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Analytics"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
    </AppContainer>
  );
};

export default AnalyticsScreen;
