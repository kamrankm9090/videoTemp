import {useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {Send2Icon} from '~/assets/svgs';
import {
  AppFlatList,
  AppIndicator,
  AppInput,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {queryClient} from '~/components/atoms/QueryClientProvider';
import {
  useLive_CreateCommentMutation,
  useLive_GetLiveCommentsQuery,
} from '~/graphql/generated';
import {liveStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize, height} from '~/utils/style';
import LiveCommentItem from './LiveCommentItem';

export default function LiveCommentSection() {
  const [text, setText] = useState('');
  const {liveData} = useSnapshot(liveStore);
  const {params}: any = useRoute();
  const listRef: any = useRef(null);
  const contentHeight = useRef(0);

  const liveId = liveData?.id || params?.item?.live?.id;
  const {data} = useLive_GetLiveCommentsQuery({liveId});

  const comments = data?.live_getLiveComments?.result?.items;

  const {mutate, isLoading} = useLive_CreateCommentMutation();

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({
        offset: contentHeight.current,
        animated: true,
      });
    }
  }, []);

  const sendComment = (text: string) => {
    if (text.trim() === '') return;
    mutate(
      {input: {liveId, text}},
      {
        onSuccess() {
          setText('');
          queryClient.invalidateQueries(['live_getLiveComments']);
          setTimeout(scrollToBottom, 100);
        },
      },
    );
  };

  const renderItem = useCallback(({item}: any) => {
    return <LiveCommentItem item={item} />;
  }, []);

  const keyExtractor = useCallback(
    (item: any) => `key-${item?.comment?.id}`,
    [],
  );

  const onContentSizeChange = useCallback(
    (_: any, contentHeightValue: number) => {
      contentHeight.current = contentHeightValue;
      scrollToBottom();
    },
    [scrollToBottom],
  );

  return (
    <VStack style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <VStack style={styles.container} gap={12} pb={12}>
          <AppFlatList
            ref={listRef}
            data={comments || []}
            style={{maxHeight: height / 3}}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            showScrollToTop={false}
            windowSize={5}
            onContentSizeChange={onContentSizeChange}
            getItemLayout={(_, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
          />

          <HStack alignItems="center" space={8}>
            <AppInput
              placeholder="Say Something"
              placeholderTextColor={Colors.GARY_5}
              value={text}
              style={styles.input}
              onChangeText={setText}
            />
            <AppTouchable
              p={4}
              borderRadius={12}
              borderWidth={1}
              borderColor={Colors.GARY_3}
              px={8}
              py={8}
              onPress={() => sendComment(text.trim())}>
              {isLoading ? (
                <AppIndicator />
              ) : (
                <Send2Icon width={18} height={18} fill={Colors.BLACK} />
              )}
            </AppTouchable>
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: fontSize.normal,
    paddingVertical: 8,
    borderColor: Colors.GARY_3,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
