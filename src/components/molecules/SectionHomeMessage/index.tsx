import React from 'react';
import {Message} from '~/assets/svgs';
import {AppTouchable} from '~/components';

export default function SectionHomeMessage() {
  function messageOnPress() {}

  return (
    <>
      <AppTouchable onPress={messageOnPress}>
        <Message />
      </AppTouchable>
    </>
  );
}
