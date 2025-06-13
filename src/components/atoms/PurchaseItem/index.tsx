import dayjs from 'dayjs';
import React from 'react';
import images from '~/assets/images';
import {CalenderIcon} from '~/assets/svgs';
import {AppImage, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize, scale} from '~/utils/style';

const PurchaseItem = ({
  title = 'Beauty Documentary',
  createdDate,
  imageSource,
}: {
  title: string;
  createdDate: string;
  imageSource: string;
}) => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <AppImage
        style={{
          width: scale(45),
          height: scale(45),
          borderRadius: scale(5),
        }}
        resizeMode="cover"
        errorImage={images.noImage}
        imageSource={getFullImageUrl(imageSource)}
      />
      <VStack space={scale(5)} flex={1} px={scale(10)}>
        <AppText fontSize={fontSize.small} numberOfLines={1}>
          {title}
        </AppText>
        <HStack space={scale(8)}>
          <CalenderIcon />
          <AppText
            fontSize={fontSize.tiny}
            color={Colors.PLACEHOLDER}
            numberOfLines={2}>
            {dayjs(createdDate).format('YYYY/MM/DD')}
          </AppText>
        </HStack>
      </VStack>
      <AppText color={Colors.WHITE_TRANSPARENT}>$75</AppText>
    </HStack>
  );
};

export default PurchaseItem;
