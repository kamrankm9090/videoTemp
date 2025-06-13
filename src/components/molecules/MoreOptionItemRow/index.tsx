import React from 'react';
import {ChevronRight} from '~/assets/svgs';
import {AppIndicator, AppText, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';

type Props = {
  onPress?: () => void;
  startIcon?: JSX.Element;
  showEndIcon?: boolean;
  endIcon?: JSX.Element;
  color?: string;
  title?: string;
  isLoading?: boolean;
};

export default function MoreOptionItemRow({
  onPress,
  startIcon,
  showEndIcon = true,
  endIcon = <ChevronRight />,
  color = Colors.WHITE,
  title,
  isLoading,
}: Props) {
  function onPressHandler() {
    onPress?.();
  }

  return (
    <AppTouchable onPress={onPressHandler}>
      <HStack space={16} px={16} py={20} rounded={8} bg={Colors.NightRider}>
        {startIcon}
        {isLoading ? (
          <AppIndicator />
        ) : (
          <AppText flex={1} fontFamily="medium" color={color}>
            {title}
          </AppText>
        )}
        {showEndIcon && endIcon}
      </HStack>
    </AppTouchable>
  );
}
