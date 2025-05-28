import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import AppTouchable from '../AppTouchable';
import AppImage from '../AppImage';
import AppText from '../AppText';
import HStack from '~/components/common/HStack';
import VStack from '~/components/common/VStack';
import {SignalIcon} from '~/assets/svgs';
import {fontSize, scale, width} from '~/utils/style';
import {Colors} from '~/styles';

const spacing = 12;
const ContentItem = ({
  item,
  index,
  isOffers,
}: {
  item: any;
  index: number;
  isOffers: boolean;
  containerStyle?: ViewStyle;
}) => {
  return (
    <AppTouchable>
      <VStack space={scale(10)}>
        <AppImage
          imageSource={
            'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
          }
          style={{
            width: width * 0.4,

            height: scale(180),
            borderRadius: scale(10),
          }}
          resizeMode="cover"
        />
        <VStack space={scale(4)}>
          <AppText>Cooking Perfection</AppText>
          <HStack space={scale(5)}>
            <SignalIcon />
            <AppText color={Colors.GARY_4} fontSize={fontSize.small}>
              124k viewers
            </AppText>
          </HStack>
        </VStack>
      </VStack>
    </AppTouchable>
  );
};

export default ContentItem;
