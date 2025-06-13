import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SheetProps} from 'react-native-actions-sheet';
import {Copy, Share} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppButton,
  AppFlatList,
  AppImage,
  AppText,
  AppTouchable,
  HStack,
  SearchInput,
  VStack,
} from '~/components';
import config from '~/config';
import {
  MediaType,
  MessageInput,
  useMessage_CreateDirectMessageMutation,
} from '~/graphql/generated';
import {useGetFollowerFollowings} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {copyToClipBoard} from '~/utils/helper';
import {fontSize, height} from '~/utils/style';
import {hideSheet, showSuccessMessage} from '~/utils/utils';

export default function SharingAction(props: SheetProps<'sharing-action'>) {
  const data = props?.payload?.item;
  const link = `${config.linkingURL}home/?id=${data?.live?.id}`;
  const {userData} = userDataStore(state => state);
  const [searchText, setSearchText] = useState<string | null>('');

  const {
    data: getFollowData,
    isLoading: isLoadingFollowingData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetFollowerFollowings({
    userId: userData?.id as number,
    where: {
      and: [
        {isFollower: {eq: false}},
        ...(searchText?.length && searchText?.length > 0
          ? [{user: {username: {contains: searchText}}}]
          : []),
      ],
    },
    options: {
      enabled: !!userData?.id,
      refetchOnMount: 'always',
    },
    isFollower: false,
  });
  const [curUserId, setCurUserId] = useState<number | null>(null);
  const {
    mutate: mutateCreateDirectMessage,
    isLoading: isLoadingCreateDirectMessage,
  } = useMessage_CreateDirectMessageMutation();

  const followData = useMemo(() => {
    return getFollowData?.pages || [];
  }, [getFollowData]);

  function onSubmitSearch(text: string) {
    setSearchText(text);
  }

  function copyHandler() {
    copyToClipBoard({value: link});
  }

  function onLoadMore() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function sendMessage(userID: number) {
    setCurUserId(userID);
    const input: MessageInput = {
      mediaType: MediaType.SharedPost,
      mediaEntityId: data?.live?.id,
      text: data?.live?.title,
      mediaUrl: data?.live?.previewUrl,
    };
    mutateCreateDirectMessage(
      {input, receiverId: userID},
      {
        onSuccess: response => {
          if (response?.message_createDirectMessage?.status?.code === 1) {
            showSuccessMessage('Message sent successfully');
            hideSheet('sharing-action');
          }
        },
      },
    );
  }

  function renderItem({item}: {item: followingItem}) {
    return (
      <SharingRow
        item={item}
        sendOnPress={sendMessage}
        isLoading={
          curUserId === item?.user?.id ? isLoadingCreateDirectMessage : false
        }
      />
    );
  }

  const loading = isLoadingFollowingData;

  return (
    <ActionSheetContainer isLoading={loading} minHeight={height * 0.75}>
      <VStack space={16} flex={1}>
        <AppText color={Colors.WhiteSmoke} fontFamily="bold">
          Select A Person
        </AppText>
        <HStack
          mt={8}
          py={12}
          px={16}
          space={16}
          rounded={8}
          borderWidth={1}
          borderColor={Colors.WHITE}>
          <Share />
          <AppText color={Colors.Silver} fontFamily="medium" flex={1}>
            {link}
          </AppText>
          <AppTouchable onPress={copyHandler}>
            <Copy />
          </AppTouchable>
        </HStack>
        <SearchInput onChange={onSubmitSearch} />
        <AppFlatList
          spaceY={40}
          data={followData}
          onRefresh={refetch}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          isLoading={isLoadingFollowingData}
        />
      </VStack>
    </ActionSheetContainer>
  );
}

function SharingRow({
  item,
  sendOnPress,
  isLoading,
}: {
  item: followingItem;
  sendOnPress: (userID: number) => void;
  isLoading: boolean;
}) {
  function onPressHandler() {
    sendOnPress?.(item?.user?.id);
  }

  return (
    <HStack space={16}>
      <AppImage
        resizeMode="stretch"
        style={styles.avatar}
        imageSource={item?.user?.photoUrl}
      />
      <AppText flex={1}>{item?.user?.username ?? ''}</AppText>
      <AppButton
        loading={isLoading}
        borderColor={Colors.Grey}
        font_weight={400}
        borderRadius={8}
        fontSize={fontSize.small}
        width={90}
        height={29}
        px={10}
        title="Send Now"
        color={Colors.NIGHT_RIDER}
        onPress={onPressHandler}
      />
    </HStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 42,
  },
});
