import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {ChevronRight, EyeOff, ReportIcon, Share, Share2Icon} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {hideSheet} from '~/utils/utils';

export default function SelectOptionAction(props: SheetProps) {
  const data: OfferOptionItemType[] = [
    {
      id: 0,
      title: 'Not interested',
      icon: <EyeOff />,
      onPress: () => {
        hideSheet('offer-select-option-action');
        
      },
    },
    {
      id: 1,
      title: 'Share',
      icon: <Share2Icon />,
      onPress: () => {
        hideSheet('offer-select-option-action');
        
      },
    },
    {
      id: 2,
      title: 'Report',
      icon: <ReportIcon />,
      onPress: () => {
        hideSheet('offer-select-option-action');
        
      },
    },
  ];

  return (
    <ActionSheetContainer>
      <AppText>Select an Option</AppText>
      <VStack mt={20} space={12}>
        {data.map(item => (
          <OptionItem key={item.id} item={item} />
        ))}
      </VStack>
    </ActionSheetContainer>
  );
}

function OptionItem({item}: {item: OfferOptionItemType}) {
  return (
    <AppTouchable onPress={item.onPress}>
      <HStack px={16} py={20} rounded={8} bg={Colors.NightRider} space={12} alignItems="center">
        {item.icon}
        <AppText flex={1} fontFamily="bold">
          {item.title}
        </AppText>
        <ChevronRight />
      </HStack>
    </AppTouchable>
  );
}
