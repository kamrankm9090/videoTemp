import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import {CloseIcon} from '~/assets/svgs';
import {
  AppText,
  AppTouchable,
  Box,
  HStack,
  SettingActivityItem,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, height, scale} from '~/utils/style';
import {logout} from '~/utils/utils';

type Item = {
  title: string;
  color?: string;
  onPress: () => void;
};

const SettingActivity = ({onclosePress}: {onclosePress: () => void}) => {
  const data: Item[] = [
    {
      title: 'Personal Information',
      onPress: () => null,
    },
    {
      title: 'Analytics',
      onPress: () => null,
    },
    {
      title: 'Your Resume ',
      onPress: () => null,
    },
    {
      title: 'Wallet',
      onPress: () => null,
    },
    {
      title: 'Saved',
      onPress: () => null,
    },
    {
      title: 'Support',
      onPress: () => null,
    },
    {
      title: 'Account Setting',
      onPress: () => null,
    },
    {
      title: 'Logout',
      color: Colors.ERROR,
      onPress: logout,
    },
  ];

  return (
    <VStack space={scale(25)} h={height * 0.88}>
      <HStack justifyContent="space-between" alignItems="center">
        <AppTouchable alignSelf="flex-start" onPress={onclosePress}>
          <CloseIcon height={scale(30)} width={scale(30)} />
        </AppTouchable>
        <AppText
          flex={1}
          fontFamily={fontFamily.bold}
          fontSize={fontSize.large}
          textAlign="center">
          Setting Activity
        </AppText>
        <Box w={scale(30)} />
      </HStack>
      <ScrollView bounces={false}>
        <VStack
          py={scale(20)}
          px={scale(15)}
          borderRadius={scale(15)}
          bg={Colors.Nero_3}>
          {data?.map(el => (
            <SettingActivityItem item={el} />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default memo(SettingActivity);
