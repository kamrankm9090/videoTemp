import React, {useRef} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TrashIcon, UploadIcon} from '~/assets/svgs';
import {
  AppHelperText,
  AppIndicator,
  AppTouchable,
  IconButton,
  VideoRecorderModal,
  VStack,
} from '~/components';
import {useGetThumbnailVideo} from '~/hooks';
import {Colors} from '~/styles';

export default function VideoPreview({name}: {name: string}) {
  const modalRef = useRef<ModalRef>();
  const {field, fieldState} = useController({name});

  const {imageUrl, isLoading} = useGetThumbnailVideo(field?.value);

  console.log({imageUrl, isLoading});

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

  function removeHandler() {
    field?.onChange('');
  }

  return (
    <VStack flex={1} space={4}>
      <AppTouchable
        borderWidth={field.value ? 0 : 1}
        borderStyle="dashed"
        h={140}
        rounded={8}
        alignItems="center"
        justifyContent="center"
        borderColor={borderColor}
        onPress={onPressHandler}>
        {!field.value ? (
          <UploadIcon />
        ) : isLoading ? (
          <AppIndicator size="large" />
        ) : (
          <FastImage
            resizeMode="stretch"
            style={styles.image}
            source={{uri: imageUrl}}
          />
        )}

        {field.value && (
          <IconButton
            top={8}
            right={8}
            onPress={removeHandler}
            zIndex={15}
            position="absolute">
            <TrashIcon />
          </IconButton>
        )}
      </AppTouchable>
      <AppHelperText error={fieldState.error} />
      <VideoRecorderModal ref={modalRef} onSelectVideo={onSelectVideo} />
    </VStack>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
