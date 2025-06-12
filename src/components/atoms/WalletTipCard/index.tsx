import React from 'react';
import {PlusIcon2, WalletIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';

const WalletTipCard = () => {
  return (
    <HStack
      mx={scale(12)}
      px={scale(15)}
      h={scale(80)}
      borderRadius={scale(10)}
      justifyContent="space-between"
      alignItems="center"
      bg={Colors.NERO}>
      <WalletIcon />
      <VStack space={scale(12)} flex={1} ps={scale(15)}>
        <AppText fontSize={fontSize.small}>Total Assets</AppText>
        <AppText fontSize={fontSize.xMedium} fontFamily={fontFamily.bold}>
          $1500
          <AppText fontSize={fontSize.tiny}> USDT</AppText>
        </AppText>
      </VStack>
      <AppTouchable>
        <HStack space={scale(8)} alignItems="center">
          <PlusIcon2 />
          <AppText color={Colors.PRIMARY}>Change</AppText>
        </HStack>
      </AppTouchable>
    </HStack>
  );
};

export default WalletTipCard;
