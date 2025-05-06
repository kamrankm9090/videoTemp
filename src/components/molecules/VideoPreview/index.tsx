import React, {useRef} from 'react';
import {useController} from 'react-hook-form';
import {
  AppHelperText,
  AppText,
  AppTouchable,
  VideoRecorderModal,
  VStack,
} from '~/components';
import {Colors} from '~/styles';

export default function VideoPreview({
  placeholder = 'Add video preview',
  name,
}: {
  placeholder?: string;
  name: string;
}) {
  const modalRef = useRef<ModalRef>();
  const {field, fieldState} = useController({name});

  function onPressHandler() {
    modalRef?.current?.open();
  }

  const borderColor = fieldState.error
    ? Colors.ERROR
    : field?.value
    ? Colors.GREEN_BRAND
    : Colors.BORDER;

  function onSelectVideo(videoUrl: string) {
    field?.onChange(videoUrl);
    modalRef?.current?.close();
  }

  return (
    <>
      <VStack space={4}>
        <AppTouchable
          borderWidth={1}
          borderStyle="dashed"
          h={100}
          rounded={8}
          alignItems="center"
          justifyContent="center"
          borderColor={borderColor}
          onPress={onPressHandler}>
          <AppText numberOfLines={1} maxWidth={200} color={Colors.PLACEHOLDER}>
            {field?.value || placeholder}
          </AppText>
        </AppTouchable>
        <AppHelperText error={fieldState.error} />
      </VStack>
      <VideoRecorderModal ref={modalRef} onSelectVideo={onSelectVideo} />
    </>
  );
}
