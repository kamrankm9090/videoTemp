import React from 'react';
import {AppContainer, AppHeader} from '~/components';
import {Colors} from '~/styles';

const WalletScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Wallet"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
    </AppContainer>
  );
};

export default WalletScreen;
