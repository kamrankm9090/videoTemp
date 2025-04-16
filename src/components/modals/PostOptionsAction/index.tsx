import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {EyeOff, InformationCircle, Share} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {switchActions} from '~/utils/utils';

const data: PostOptionItemType[] = [
  {
    id: 0,
    title: 'Not interested',
    onPress: () => {},
    icon: <EyeOff />,
  },
  {
    id: 1,
    title: 'Share',
    onPress: () => switchActions('sharing-action'),
    icon: <Share />,
  },
  {
    id: 2,
    title: 'Report',
    onPress: () => switchActions('report-action'),
    icon: <InformationCircle />,
    color: Colors.ERROR,
  },
];

export default function PostOptionsAction(props: SheetProps) {
  return (
    <ActionSheetContainer>
      <AppText>Select An Option</AppText>
      <VStack mt={24} space={16}>
        {data?.map((item: PostOptionItemType) => {
          return <Item key={item?.id} item={item} />;
        })}
      </VStack>
    </ActionSheetContainer>
  );
}

function Item({item}: {item: PostOptionItemType}) {
  const {title, icon, color = Colors.WHITE, onPress} = item;
  return (
    <AppTouchable onPress={onPress}>
      <HStack px={8} py={16} rounded={8} bg={Colors.NightRider} space={12}>
        {icon}
        <AppText fontFamily="medium" color={color}>
          {title}
        </AppText>
      </HStack>
    </AppTouchable>
  );
}
