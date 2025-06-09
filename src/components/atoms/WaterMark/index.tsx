import React from 'react';
import {WaterMarkIcon} from '~/assets/svgs';
import {Center} from '~/components';

export default function WaterMark() {
  return (
    <Center position="absolute" left={12} bottom={12}>
      <WaterMarkIcon />
    </Center>
  );
}
