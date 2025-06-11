import React, {useCallback} from 'react';
import images from '~/assets/images';
import {BookmarkFillIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize, scale} from '~/utils/style';

const SavedItem = ({
  title,
  description,
  imageSource,
  type = 'saved',
  id,
  onRemovePress,
}: {
  title: string;
  description: string;
  imageSource: string;
  id: number;
  type?: 'income' | 'saved';
  onRemovePress: (id: number) => void;
}) => {
  const renderRightItem = useCallback(() => {
    switch (type) {
      case 'income':
        return <AppText color={Colors.WHITE_TRANSPARENT}>$75</AppText>;

      default:
        return (
          <AppTouchable onPress={() => onRemovePress?.(id)}>
            <BookmarkFillIcon />
          </AppTouchable>
        );
    }
  }, [type]);

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
        imageSource={getFullImageUrl(imageSource)}
      />
      <VStack space={scale(10)} flex={1} px={scale(8)}>
        <AppText fontSize={fontSize.small} numberOfLines={1}>
          {title}
        </AppText>
        <AppText
          fontSize={fontSize.tiny}
          color={Colors.PLACEHOLDER}
          numberOfLines={2}>
          {description}
        </AppText>
      </VStack>
      {renderRightItem?.()}
    </HStack>
  );
};

export default SavedItem;
