import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {ChevronRight, Close2} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  Box,
  HStack,
  MoreOptionItemRow,
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
    title = 'More Option',
    data = [],
    onClose = () => {},
    showTitle = true,
  } = props?.payload ?? {};

  return (
    <ActionSheetContainer>
      <HStack pb={scale(10)} justifyContent="space-between" mb={12}>
        {showTitle ? (
          <AppText fontSize={16} fontFamily="bold">
            {title}
          </AppText>
        ) : (
          <Box flex={1} />
        )}
        <Close2
          stroke={Colors.Grey}
          onPress={() => {
            hideSheet('more-option-action');
            onClose?.();
          }}
        />
      </HStack>

      <VStack space={12}>
        {data?.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </VStack>
    </ActionSheetContainer>
  );
}

function Item({item}: {item: MoreOptionItemType}) {
  const {
    title,
    onPress,
    color = Colors.WHITE,
    keyLoading = '',
    startIcon,
    endIcon = <ChevronRight />,
    showEndIcon = true,
    customComponent,
  } = item;
  const isLoading = useAnyMutating(keyLoadingArray);
  const isExistLoading = keyLoadingArray.includes(keyLoading);

  if (customComponent) {
    return <>{customComponent}</>;
  }

  return (
    <MoreOptionItemRow
      isLoading={isLoading && isExistLoading}
      {...{title, startIcon, endIcon, showEndIcon, color, onPress}}
    />
  );
}
