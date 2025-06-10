import {useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSnapshot} from 'valtio';
import {Send2Icon} from '~/assets/svgs';
import {
  AppFlatList,
  AppGradientView,
  AppIndicator,
  AppInput,
  AppKeyboardAvoidingView,
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

  const liveId = liveData?.live?.id || params?.item?.live?.id;
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
    <VStack
      zIndex={1}
      h={height - 120}
      w={'100%'}
      alignSelf="center"
      justifyContent="flex-end"
      position="absolute"
      bottom={0}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}>
        <AppKeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'position'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
          <VStack
            flex={1}
            justifyContent="flex-end"
            zIndex={10}
            gap={12}
            pb={12}>
            <AppFlatList
              ref={listRef}
              data={comments || []}
              style={{maxHeight: height / 3, zIndex: 10}}
              contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
              keyExtractor={keyExtractor}
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

            <HStack alignItems="center" space={8} mb={40}>
              <AppGradientView
                colors={['transparent', Colors.BLACK]}
                style={styles.gradient}
                pointerEvents="none"
              />
              <AppInput
                placeholder="Say Something"
                placeholderTextColor={Colors.GARY_5}
                value={text}
                style={styles.input}
                onChangeText={setText}
                returnKeyLabel="Send"
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
        </AppKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    zIndex: 10,
    // minHeight:500,
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
  gradient: {
    width: '120%',
    position: 'absolute',
    bottom: -40,
    left: -20,
    right: 0,
    height: 600,
    zIndex: 0,
  },
});
