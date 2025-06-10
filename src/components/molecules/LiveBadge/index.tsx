import React from 'react';
import {AppText, Center} from '~/components';
import {Colors} from '~/styles';

export default function LiveBadge({isLive}: {isLive?: boolean}) {
  if (isLive) {
    return (
      <Center
        pt={3}
        pb={5}
        px={10}
        top={12}
        left={12}
        rounded={20}
        bg={Colors.ERROR}
        position="absolute">
        <AppText fontFamily="bold">Live</AppText>
      </Center>
    );
  }

  return null;
}
