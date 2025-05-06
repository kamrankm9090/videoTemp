import React, {forwardRef} from 'react';
import {
  ModalContainer,
  ScreensHeader,
  VideoPreviewRecorder,
  VStack,
} from '~/components';
import {Colors} from '~/styles';

type Props = {
  onClose?: () => void;
  onSelectVideo?: (videoFile: string) => void;
};
function VideoRecorderModal({onClose, onSelectVideo}: Props, ref: any) {
  function closeModal() {
    ref?.current?.close();
  }

  return (
    <ModalContainer px={0} ref={ref} onDismiss={onClose}>
      <VStack flex={1}>
        <ScreensHeader
          w="100%"
          zIndex={700}
          backgroundColor={Colors.TRANSPARENT}
          iconColor={Colors.BLACK_TRANSPARENT_3}
          backAction
          position="absolute"
          backActionHandler={closeModal}
        />
        <VideoPreviewRecorder onSelectVideo={onSelectVideo} />
      </VStack>
    </ModalContainer>
  );
}

export default forwardRef(VideoRecorderModal);
