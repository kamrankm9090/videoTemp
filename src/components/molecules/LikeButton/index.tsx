import React, {useEffect, useState} from 'react';
import {
  useLive_LikeMutation,
  useLive_RemoveLikeMutation,
} from '~/graphql/generated';
import {showErrorMessage} from '~/utils/utils';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {LikeFillIcon, LikeIcon} from '~/assets/svgs';
import {fontSize} from '~/utils/style';
import {ViewStyle} from 'react-native';

export default function LikeButton({
  isLiked,
  liveId,
  likeCount = 0,
  orientation = 'horizontal',
  p,
  rounded,
  bg,
  alignItems,
}: {
  isLiked?: boolean;
  liveId: number;
  likeCount: number;
  orientation: 'horizontal' | 'vertical';
  p?: ViewStyle['padding'];
  rounded?: ViewStyle['borderRadius'];
  bg?: ViewStyle['backgroundColor'];
  alignItems?: ViewStyle['alignItems'];
}) {
  const Wrapper = orientation === 'horizontal' ? HStack : VStack;

  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(likeCount);

  const {mutate: mutateLike} = useLive_LikeMutation();
  const {mutate: mutateRemoveLike} = useLive_RemoveLikeMutation();

  useEffect(() => {
    setLiked(isLiked ?? false);
  }, [isLiked]);

  async function saveOnPress() {
    if (liked) {
      setLiked(false);
      setCount(prev => prev - 1);
      mutateRemoveLike(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_removeLike?.code !== 1) {
              showErrorMessage(response?.live_removeLike?.description);
            }
          },
        },
      );
    } else {
      setLiked(true);
      setCount(prev => prev + 1);
      mutateLike(
        {liveId},
        {
          onSuccess: response => {
            if (response?.live_like?.code !== 1) {
              showErrorMessage(response?.live_like?.description);
            }
          },
        },
      );
    }
  }

  return (
    <Wrapper alignItems={alignItems} space={4}>
      <AppTouchable
        alignItems="center"
        justifyContent="center"
        {...{p, rounded, bg}}
        onPress={saveOnPress}>
        {liked ? <LikeFillIcon /> : <LikeIcon />}
      </AppTouchable>
      <AppText fontSize={fontSize.small}>{count}</AppText>
    </Wrapper>
  );
}
