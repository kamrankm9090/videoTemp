import React from 'react';
import {VolumeHighIcon, VolumeSlashIcon} from '~/assets/svgs';
import {AppTouchable} from '~/components';

export default function MuteButton({
  onPress,
  status,
}: {
  onPress: () => void;
  status?: boolean;
}) {
  return (
    <AppTouchable
      right={12}
      top={55}
      rounded={16}
      p={4}
      position="absolute"
      onPress={onPress}>
      {status ? <VolumeSlashIcon /> : <VolumeHighIcon />}
    </AppTouchable>
  );
}
