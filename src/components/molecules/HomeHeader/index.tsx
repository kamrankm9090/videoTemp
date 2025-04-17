import React from 'react';
import {AppLogo, Search} from '~/assets/svgs';
import {
  AppTouchable,
  HStack,
  ScreensHeader,
  SectionHomeMessage,
  SectionHomeNotification,
} from '~/components';

export default function HomeHeader() {
  function searchOnPress() {}

  return (
    <ScreensHeader
      leftHeader={<AppLogo height={27} width={63} />}
      rightHeader={
        <HStack space={16}>
          <AppTouchable onPress={searchOnPress}>
            <Search />
          </AppTouchable>
          <SectionHomeMessage />
          <SectionHomeNotification />
        </HStack>
      }
    />
  );
}
