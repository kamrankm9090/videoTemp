import { useRoute } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SettingIcon } from '~/assets/svgs';
import {
  AppContainer,
  AppFlatList,
  AppHeader,
  CommunityDetailBottomInputBar,
  CommunityDetailItem,
  queryClient,
} from '~/components';
import {
  SortEnumType,
  useCommunity_CreateMessageMutation,
} from '~/graphql/generated';
import { useInfiniteCommunity_GetCommunityMessagesQuery } from '~/hooks/community/useGetCommunityMessages';
import { navigate } from '~/navigation/methods';
import { Colors } from '~/styles';

const CommunityDetail = () => {
  const route = useRoute();
  const item: any = route?.params;
  const [imageUtl, setImageUrl] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const scrollOffsetRef = useRef(0);
  const contentHeightRef = useRef(0);

  
  const {
    data,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteCommunity_GetCommunityMessagesQuery({
    communityId: item?.id,
    order: {
      createdDate: SortEnumType.Desc,
    },
  });

  const allMessages = data?.pages?.flatMap(page => page?.community_getCommunityMessages?.result?.items || []);

  const { mutate, isLoading: isLoadingMessage } = useCommunity_CreateMessageMutation();

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  useEffect(() => {
    if (!isLoading && allMessages?.length > 0) {
      scrollToBottom();
    }
  }, [isLoading]);

  const onSendMessage = (text: any) => {
    mutate(
      {
        input: {
          communityId: item?.id,
          message: text,
          mediaUrl: imageUtl,
        },
      },
      {
        onSuccess() {
          setImageUrl('');
          queryClient.refetchQueries(['community_getCommunityMessages.infinite']);
          scrollToBottom();
        },
      }
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollOffsetRef.current = offsetY;
    if (offsetY >= contentHeightRef.current - 800 && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    if (isFetchingNextPage) {
      const scrollOffset = scrollOffsetRef.current;
      const oldContentHeight = contentHeightRef.current;

      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: contentHeight - oldContentHeight + scrollOffset,
          animated: false,
        });
      }, 50);
    }

    contentHeightRef.current = contentHeight;
  };

  const renderItem = ({ item }: any) => <CommunityDetailItem item={item} />;

  return (
    <AppContainer>
      <AppHeader
        backAction
        title={item?.title}
        backgroundColor={Colors.BACKGROUND}
        titleColor={Colors.WHITE}
        rightHeader={
          <SettingIcon
            onPress={() =>
              navigate('CommunityStack', {
                screen: 'CommunityInfo',
                params: { item },
              })
            }
          />
        }
        subTitle={`${item?.userCount} member • 1,230 online`}
        subTitleColor={Colors.DarkGray}
      />

      <AppFlatList
        ref={flatListRef}
        data={allMessages || []}
        keyExtractor={(item, index) => `message-${index}`}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={renderItem}
        onScroll={handleScroll}
        onContentSizeChange={onContentSizeChange}
        scrollEventThrottle={16}
        inverted
      />

      <CommunityDetailBottomInputBar
        isLoading={isLoadingMessage}
        onSendMessage={onSendMessage}
        onAttach={setImageUrl}
      />
    </AppContainer>
  );
};

export default CommunityDetail;

const styles = StyleSheet.create({});
