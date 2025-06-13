import React, {memo, ReactNode} from 'react';
import {BuyIcon, DepositIcon, WithdrawIcon} from '~/assets/svgs';
import {
  AppHeader,
  AppText,
  AppTouchable,
  HStack,
  VStack,
  WalletTipCard,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize, scale, width} from '~/utils/style';

const HeaderWallet = () => {
  return (
    <VStack
      space={scale(20)}
      flex={1}
      px={scale(12)}
      pb={scale(20)}
      pt={scale(10)}>
      <AppHeader
        title="Wallet"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <WalletTipCard />
      <HStack
        flex={1}
        space={scale(5)}
        px={scale(12)}
        w={width}
        justifyContent="space-between"
        alignItems="center">
        <Item icon={<DepositIcon />} title="Deposit" />
        <Item icon={<WithdrawIcon />} title="Withdraw" />
        <Item icon={<BuyIcon />} title="Buy" />
      </HStack>
    </VStack>
  );
};

const Item = ({
  icon,
  title,
  onPress,
}: {
  icon: ReactNode;
  title: string;
  onPress: () => void;
}) => {
  return (
    <AppTouchable onPress={onPress} flex={1}>
      <VStack
        justifyContent="center"
        alignItems="center"
        borderWidth={1}
        h={scale(80)}
        borderColor={Colors.NIGHT_RIDER}
        borderRadius={scale(10)}
        space={scale(10)}>
        {icon && icon}
        <AppText fontSize={fontSize.tiny}>{title}</AppText>
      </VStack>
    </AppTouchable>
  );
};

export default memo(HeaderWallet);
