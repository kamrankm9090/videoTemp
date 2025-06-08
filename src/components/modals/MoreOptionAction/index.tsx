import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
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
import {scale} from '~/utils/style';
import {hideSheet} from '~/utils/utils';

export type MoreOptionItemType = {
  id: number;
  title: string;
  onPress: () => void;
  color?: string;
};

const dataTemp: MoreOptionItemType[] = [
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

export default function MoreOptionAction(
  props: SheetProps<'more-option-action'>,
) {
  const {
    title = ' More Option',
    data = dataTemp,
    onClose = () => {},
  } = props?.payload ?? {};

  return (
    <ActionSheetContainer>
      <VStack space={scale(10)}>
        <HStack justifyContent="space-between" mb={12}>
          <AppText fontSize={16} fontFamily="bold">
            {title}
          </AppText>
          <Close2
            onPress={() => {
              hideSheet('more-option-action');
              onClose();
            }}
          />
        </HStack>

        <VStack space={12}>
          {data.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </VStack>
      </VStack>
    </ActionSheetContainer>
  );
}

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
