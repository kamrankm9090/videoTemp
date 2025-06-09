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
import {queryClient} from '~/components/atoms/QueryClientProvider';
import {useCommunity_DeleteCommunityMutation} from '~/graphql/generated';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {hideSheet, showSheet} from '~/utils/utils';

export default function MoreOptionAction(
  props: SheetProps<'more-option-action'>,
) {
  const item: any = props?.payload;
  const {mutate, isLoading} = useCommunity_DeleteCommunityMutation();
  const deleteCommunity = () => {
    mutate(
      {communityId: item?.id},
      {
        onSuccess(data, variables, context) {
          if (data?.community_deleteCommunity?.code === 1) {
            queryClient.refetchQueries(['community_getCommunities.infinite']);
            hideSheet('more-option-action');
            navigate('Community');
          }
        },
      },
    );
  };
  const data: MoreOptionItemType[] = [
    {
      id: 0,
      title: 'Edit',
      onPress: () => {
        setTimeout(() => {
          showSheet('create-community-action', {payload: props?.payload});
        }, 500);
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
      title: isLoading? "Deleting..." : 'Delete community',
      color: Colors.ERROR,
      onPress: () => {
        deleteCommunity();
      },
    },
  ];

  return (
    <ActionSheetContainer>
      <HStack justifyContent="space-between" mb={12}>
        <AppText fontSize={16} fontFamily="bold">
          More Option
        </AppText>
        <Close2 onPress={() => hideSheet('more-option-action')} />
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
