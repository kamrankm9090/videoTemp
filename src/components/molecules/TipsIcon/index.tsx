import React from 'react';
import {DollarCircleIcon} from '~/assets/svgs';
import {AppText, AppTouchable} from '~/components';
import {Colors} from '~/styles';
import {showSheet} from '~/utils/utils';

export default function TipsIcon({userId}: {userId: number}) {
  function onPressHandler() {
    showSheet('tips-action', {payload: {userId}});
  }

  return (
    <AppTouchable
      bg={Colors.WHITE_TRANSPARENT_6}
      px={8}
      py={4}
      rounded={14}
      gap={6}
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      zIndex={2}
      onPress={onPressHandler}>
      <DollarCircleIcon />
      <AppText
        fontWeight="500"
        fontSize={13}
        color={Colors.BLACK_TRANSPARENT_8}>
        Tip
      </AppText>
    </AppTouchable>
  );
}
