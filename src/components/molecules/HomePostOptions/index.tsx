import React from 'react';
import {ThreePoint} from '~/assets/svgs';
import {AppTouchable} from '~/components';
import {showSheet} from '~/utils/utils';

export default function HomePostOptions() {
  function openOptionsModal() {
    showSheet('post-options-action');
  }

  return (
    <>
      <AppTouchable zIndex={999} p={2} onPress={openOptionsModal}>
        <ThreePoint />
      </AppTouchable>
    </>
  );
}
