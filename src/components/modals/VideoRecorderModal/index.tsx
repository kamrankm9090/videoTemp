import React, {forwardRef} from 'react';
import {
  ModalContainer,
  ScreensHeader,
  VideoPreviewRecorder,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {height} from '~/utils/style';

type Props = {
  onClose?: () => void;
  onSelectVideo?: (videoFile: string) => void;
};
function VideoRecorderModal({onClose, onSelectVideo}: Props, ref: any) {
  function closeModal() {
    ref?.current?.close();
  }

  return (
    <ModalContainer
      style={{flex: 1}}
      px={0}
      ref={ref}
      onDismiss={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      supportedOrientations={['portrait', 'landscape']}
      avoidKeyboard={true}
      coverScreen={true}
      hasBackdrop={true}
      backdropColor={Colors.BLACK_TRANSPARENT_3}
      useNativeDriver={true}>
      <VStack w="100%" h={height} flexGrow={1}>
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
