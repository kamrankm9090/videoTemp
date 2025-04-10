import React from 'react';
import {AppLogo} from '~/assets/svgs';
import {Divider, VStack} from '~/components';
import {Colors} from '~/styles';

export default function AuthHeader() {
  return (
    <VStack space={48} alignItems="center">
      <AppLogo width={122} height={47} />
      <Divider backgroundColor={Colors.NIGHT_RIDER} />
    </VStack>
  );
}
