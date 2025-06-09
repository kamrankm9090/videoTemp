import React from 'react';
import {AppContainer, AppHeader} from '~/components';
import {Colors} from '~/styles';

const ResumeScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Your Resume"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
    </AppContainer>
  );
};

export default ResumeScreen;
