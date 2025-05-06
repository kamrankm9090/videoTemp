import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {useSnapshot} from 'valtio';
import {ChevronRight, LiveTV, VideoCall} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {hideSheet} from '~/utils/utils';

export default function CreateOptionsAction() {
  const {setLiveType} = useSnapshot(liveStore);

  const data: CreateOptionItemType[] = [
    {
      id: 0,
      title: 'Monetized Live',
      description: 'Create live content to earn money',
      onPress: () => {
        setLiveType('LIVE_CONTENT');
        navigate('CreateStack', {screen: 'CreateContent'});
        hideSheet('create-options-action');
      },
      icon: <LiveTV />,
    },
    {
      id: 1,
      title: 'Collaborative Live',
      description: 'Make live requests and inform',
      onPress: () => {
        setLiveType('COLLABORATION');
        navigate('CreateStack', {screen: 'CreateContent'});
        hideSheet('create-options-action');
      },
      icon: <VideoCall />,
    },
  ];

  return (
    <ActionSheetContainer>
      <AppText>Select a Creating Option</AppText>
      <VStack mt={20} space={12}>
        {data?.map((item: CreateOptionItemType) => {
          return <Item key={item?.id} item={item} />;
        })}
      </VStack>
    </ActionSheetContainer>
  );
}

function Item({item}: {item: CreateOptionItemType}) {
  const {title, description, icon, color = Colors.WHITE, onPress} = item;
  return (
    <AppTouchable onPress={onPress}>
      <HStack px={16} py={20} rounded={8} bg={Colors.NightRider} space={12}>
        <VStack space={12} flex={1}>
          <HStack space={12}>
            {icon}
            <AppText fontFamily="medium" color={color}>
              {title}
            </AppText>
          </HStack>
          <AppText color={Colors.Grey}>{description}</AppText>
        </VStack>
        <ChevronRight />
      </HStack>
    </AppTouchable>
  );
}
