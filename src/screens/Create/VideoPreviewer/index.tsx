import React from 'react';
import {AppContainer, ScreensHeader, VideoPreviewRecorder} from '~/components';

export default function VideoPreviewerScreen() {
  return (
    <AppContainer>
      <ScreensHeader backAction />
      <VideoPreviewRecorder />
    </AppContainer>
  );
}
