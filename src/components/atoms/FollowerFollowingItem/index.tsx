import React from 'react';
import {CloseIcon} from '~/assets/svgs/SvgComponents';
import HStack from '~/components/common/HStack';
import VStack from '~/components/common/VStack';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import AppButton from '../AppButton';
import AppText from '../AppText';
import AppTouchable from '../AppTouchable';
import Avatar from '../Avatar';

const FollowerFollowingItem = () => {
  return (
    <HStack px={scale(15)} justifyContent="space-between" alignItems="center">
      <Avatar
        size={scale(50)}
        uri={
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
        }
      />
      <VStack
        flex={1}
        ps={scale(10)}
        h={scale(50)}
        justifyContent="space-between">
        <AppText>Liam Clarke</AppText>
        <AppText>Producer</AppText>
      </VStack>

      <HStack space={scale(5)}>
        <AppButton
          width={scale(70)}
          height={scale(32)}
          hasWidth
          title="follow"
        />
        <AppTouchable>
          <CloseIcon fill={Colors.WHITE} style={{}} />
        </AppTouchable>
      </HStack>
    </HStack>
  );
};

export default FollowerFollowingItem;
