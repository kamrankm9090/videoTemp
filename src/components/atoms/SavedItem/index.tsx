import React from 'react';
import images from '~/assets/images';
import {BookmarkFillIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize, scale} from '~/utils/style';

const SavedItem = ({item}: {item: any}) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" px={scale(12)}>
      <AppImage
        style={{
          width: scale(45),
          height: scale(45),
          borderRadius: scale(5),
        }}
        resizeMode="cover"
        errorImage={images.noImage}
        imageSource={getFullImageUrl(
          'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
        )}
      />
      <VStack space={scale(10)} flex={1} px={scale(8)}>
        <AppText fontSize={fontSize.small} numberOfLines={1}>
          Beauty Documentary
        </AppText>
        <AppText
          fontSize={fontSize.tiny}
          color={Colors.PLACEHOLDER}
          numberOfLines={2}>
          a live stream where the person that peopl...
        </AppText>
      </VStack>
      <AppTouchable>
        <BookmarkFillIcon />
      </AppTouchable>
    </HStack>
  );
};

export default SavedItem;
