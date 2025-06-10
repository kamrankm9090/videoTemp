import React from 'react';
import {StyleSheet} from 'react-native';
import {
  AppImage,
  AppText,
  HomePostOptions,
  HStack,
  LikeButton,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {formatNumber} from '~/utils/helper';
import {fontSize} from '~/utils/style';

export default function SectionUserRow({data}: {data: LiveDto}) {
  const live = data?.live;
  const user = live?.user;

  return (
    <HStack px={16} mt={8} alignItems="flex-start" space={12}>
      <AppImage
        resizeMode="stretch"
        imageSource={user?.photoUrl}
        style={styles.avatar}
      />
      <VStack space={8} flex={1}>
        <HStack space={12} alignItems="flex-start">
          <AppText
            flex={1}
            numberOfLines={2}
            fontSize={fontSize.medium}
            fontFamily="medium">
            {live?.title ?? '-'}
          </AppText>
          <LikeButton
            likeCount={data?.live?.likeCount}
            isLiked={data?.isLiked}
            liveId={data?.live?.id}
          />
          <HomePostOptions data={data} />
        </HStack>
        <HStack space={6}>
          <AppText color={Colors.DarkGray}>{live?.user?.username}</AppText>
          <AppText color={Colors.DarkGray}>.</AppText>
          <AppText color={Colors.DarkGray}>{`${formatNumber(
            live?.viewCount,
          )} views`}</AppText>
          <AppText color={Colors.DarkGray}>.</AppText>
          <AppText color={Colors.DarkGray}>{`${formatNumber(
            live?.purchaseCount,
          )} bought`}</AppText>
        </HStack>
      </VStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 41,
    width: 41,
    borderRadius: 41,
  },
});
