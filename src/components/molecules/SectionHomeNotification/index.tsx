import React from 'react';
import {Notification} from '~/assets/svgs';
import {AppTouchable} from '~/components';

export default function SectionHomeNotification() {
  function notificationOnPress() {}

  return (
    <>
      <AppTouchable onPress={notificationOnPress}>
        <Notification />
      </AppTouchable>
    </>
  );
}
