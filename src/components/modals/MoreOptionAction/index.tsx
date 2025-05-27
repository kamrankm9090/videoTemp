import React from 'react';
import {ChevronRight, Close2} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {hideSheet} from '~/utils/utils';

export default function MoreOptionAction() {
  const data: MoreOptionItemType[] = [
    {
      id: 0,
      title: 'Edit',
      onPress: () => {
        hideSheet('more-option-action');
      },
    },
    {
      id: 1,
      title: 'Invite link',
      onPress: () => {
        navigate('InviteLink');
        hideSheet('more-option-action');
      },
    },
    {
      id: 2,
      title: 'Delete community',
      color: Colors.ERROR,
      onPress: () => {
        hideSheet('more-option-action');
      },
    },
  ];

  return (
    <ActionSheetContainer>
      <HStack justifyContent='space-between' mb={12}>
        <AppText fontSize={16} fontFamily="bold" >
          More Option
        </AppText>
        <Close2 onPress={() => hideSheet("more-option-action")}/>
      </HStack>

      <VStack space={12}>
        {data.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </VStack>
    </ActionSheetContainer>
  );
}

type MoreOptionItemType = {
  id: number;
  title: string;
  onPress: () => void;
  color?: string;
};

function Item({item}: {item: MoreOptionItemType}) {
  const {title, onPress, color = Colors.WHITE} = item;

  return (
    <AppTouchable onPress={onPress}>
      <HStack
        px={16}
        py={20}
        rounded={8}
        bg={Colors.NightRider}
        alignItems="center"
        justifyContent="space-between">
        <AppText fontFamily="medium" color={color}>
          {title}
        </AppText>
        <ChevronRight />
      </HStack>
    </AppTouchable>
  );
}
