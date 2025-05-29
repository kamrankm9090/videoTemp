import React from 'react';
import {ViewStyle} from 'react-native';
import {SignalIcon} from '~/assets/svgs';
import HStack from '~/components/common/HStack';
import VStack from '~/components/common/VStack';
import {Colors} from '~/styles';
import {formatViewCount, getFullImageUrl} from '~/utils/helper';
import {fontSize, scale, width} from '~/utils/style';
import AppImage from '../AppImage';
import AppText from '../AppText';
import AppTouchable from '../AppTouchable';

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
          imageSource={getFullImageUrl(item?.live?.photoUrl)}
          style={{
            width: width * 0.4,

            height: scale(180),
            borderRadius: scale(10),
          }}
          resizeMode="cover"
        />
        <VStack space={scale(4)}>
          <AppText>{item?.live?.title}</AppText>
          <HStack space={scale(5)}>
            <SignalIcon />
            <AppText color={Colors.GARY_4} fontSize={fontSize.small}>
              {formatViewCount(item?.live?.viewCount)}
            </AppText>
          </HStack>
        </VStack>
      </VStack>
    </AppTouchable>
  );
};

export default ContentItem;
