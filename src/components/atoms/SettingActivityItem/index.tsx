import React, {memo} from 'react';
import {RightArrowIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize, scale} from '~/utils/style';

type Item = {
  title: string;
  color?: string;
  onPress: () => void;
};

const SettingActivityItem = ({item}: {item: Item}) => {
  return (
    <AppTouchable onPress={() => item?.onPress?.()}>
      <HStack
        bg={Colors.NERO}
        py={scale(17)}
        px={scale(10)}
        borderRadius={scale(5)}
        justifyContent="space-between"
        alignItems="center">
        <AppText fontSize={fontSize.small} color={item?.color || Colors.WHITE}>
          {item?.title}
        </AppText>
        <RightArrowIcon />
      </HStack>
    </AppTouchable>
  );
};

export default memo(SettingActivityItem);
