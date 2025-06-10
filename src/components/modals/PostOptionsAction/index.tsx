import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {EyeOff, InformationCircle, Share} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  HStack,
  queryClient,
  VStack,
} from '~/components';
import {queryKeys} from '~/constants/queryKeys';
import {useLive_CreateNotInterestedMutation} from '~/graphql/generated';
import {homeFlatListRef} from '~/screens/Home/Home';
import {Colors} from '~/styles';
import {
  hideSheet,
  showErrorMessage,
  showInfoMessage,
  switchActions,
} from '~/utils/utils';

export default function PostOptionsAction(
  props: SheetProps<'post-options-action'>,
) {
  const {payload} = props;
  const liveId = payload?.item?.live?.id;

  const {mutate: mutateNotInterested, isLoading: isLoadingNotInterested} =
    useLive_CreateNotInterestedMutation();

  const data: PostOptionItemType[] = [
    {
      id: 0,
      title: 'Not interested',
      onPress: async () => {
        mutateNotInterested(
          {liveId},
          {
            onSuccess: response => {
              if (response?.live_createNotInterested?.code === 1) {
                showInfoMessage('Content has been Hidden');
                hideSheet('post-options-action');
                setTimeout(() => {
                  homeFlatListRef?.current?.scrollToIndex?.({
                    index: 0,
                    animated: true,
                  });
                }, 100);
                queryClient.invalidateQueries([queryKeys.getLivesForHome], {
                  exact: false,
                });
              } else {
                showErrorMessage(
                  response?.live_createNotInterested?.description,
                );
              }
            },
          },
        );
      },
      icon: <EyeOff />,
    },
    {
      id: 1,
      title: 'Share',
      onPress: () =>
        switchActions('sharing-action', 'post-options-action', {payload}),
      icon: <Share />,
    },
    {
      id: 2,
      title: 'Report',
      onPress: () =>
        switchActions('report-action', 'post-options-action', {
          payload: {liveId},
        }),
      icon: <InformationCircle />,
      color: Colors.ERROR,
    },
  ];

  return (
    <ActionSheetContainer isLoading={isLoadingNotInterested}>
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
