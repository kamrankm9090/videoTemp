import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {ChevronRight, Close2} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppIndicator,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {useAnyMutating} from '~/utils/helper';
import {scale} from '~/utils/style';
import {hideSheet} from '~/utils/utils';

const keyLoadingArray = ['community_deleteCommunity'];

export default function MoreOptionAction(
  props: SheetProps<'more-option-action'>,
) {
  const {
    title = ' More Option',
    data = [],
    onClose = () => {},
  } = props?.payload ?? {};

  return (
    <ActionSheetContainer>
      <HStack pb={scale(10)} justifyContent="space-between" mb={12}>
        <AppText fontSize={16} fontFamily="bold">
          {title}
        </AppText>
        <Close2
          onPress={() => {
            hideSheet('more-option-action');
            onClose?.();
          }}
        />
      </HStack>

      <VStack space={12}>
        {data.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </VStack>
    </ActionSheetContainer>
  );
}

function Item({item}: {item: MoreOptionItemType}) {
  const {title, onPress, color = Colors.WHITE, keyLoading = ''} = item;
  const isLoading = useAnyMutating(keyLoadingArray);
  const isExistLoading = keyLoadingArray.includes(keyLoading);

  return (
    <AppTouchable onPress={onPress}>
      <HStack
        px={16}
        py={20}
        rounded={8}
        bg={Colors.NightRider}
        alignItems="center"
        justifyContent="space-between">
        {isLoading && isExistLoading ? (
          <AppIndicator />
        ) : (
          <AppText fontFamily="medium" color={color}>
            {title}
          </AppText>
        )}
        <ChevronRight />
      </HStack>
    </AppTouchable>
  );
}
