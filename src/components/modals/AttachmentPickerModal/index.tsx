import React, {Fragment, useEffect, useRef} from 'react';
import {ActionSheetRef} from 'react-native-actions-sheet';
import ImagePicker, {
  Options as ImagePickerOptions,
  Image as ImagePickerResponse,
} from 'react-native-image-crop-picker';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  Divider,
  HStack,
  VStack,
} from '~/components';
import {cropPickerOptions, pickerOptions} from '~/constants/constants';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {requestReadPermission} from '~/utils/permissions';
import {scale} from '~/utils/style';

interface PickerItemProps {
  title: string;
  onPress: () => void;
}

interface Props {
  visible: boolean;
  onChangeImage: (image: ImagePickerResponse) => void;
  onClose: () => void;
  imagePickerOptions?: ImagePickerOptions;
}

export default function AttachmentPickerModal({
  visible,
  onChangeImage,
  onClose,
  imagePickerOptions = cropPickerOptions,
}: Props) {
  const sheetRef = useRef<ActionSheetRef>(null);

  const openSheet = () => {
    sheetRef.current?.open();
  };

  const closeSheet = () => {
    sheetRef.current?.close();
  };

  useEffect(() => {
    if (visible) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [visible]);

  const pickerData = [
    {
      title: 'Choose From Gallery',
      onPress: () => onPressGalleryPhoto(),
    },
    {
      title: 'Take Photo',
      onPress: () => onPressOpenCamera(),
    },
  ];

  function onPressOpenCamera() {
    ImagePicker.openCamera(pickerOptions)
      .then(async (image: ImagePickerResponse) => {
        const res = await ImagePicker.openCropper({
          ...imagePickerOptions,
          path: image.path,
        });
        onChangeImage?.({...res, sourceURL: image?.path});
      })
      .finally(onClose);
  }

  async function onPressGalleryPhoto() {
    if (isIos) {
      ImagePicker.openPicker(pickerOptions)
        .then(async (image: ImagePickerResponse) => {
          const res = await ImagePicker.openCropper({
            ...imagePickerOptions,
            path: image.path,
          });
          onChangeImage?.({...res, sourceURL: image?.path});
        })
        .finally(onClose);
    } else {
      const hasPermissionReadMediaImages = await requestReadPermission();
      if (hasPermissionReadMediaImages) {
        ImagePicker.openPicker(pickerOptions)
          .then(async (image: ImagePickerResponse) => {
            const res = await ImagePicker.openCropper({
              ...imagePickerOptions,
              path: image.path,
            });
            onChangeImage?.({...res, sourceURL: image?.path});
          })
          .finally(onClose);
      }
    }
  }

  return (
    <ActionSheetContainer ref={sheetRef} onClose={onClose}>
      <VStack w={'100%'} p={scale(7)}>
        {pickerData.map((item: PickerItemProps, index: number) => (
          <Fragment key={`pickerItem${index}`}>
            <AppTouchable onPress={item.onPress} activeOpacity={0.7}>
              <HStack space={scale(5)} alignItems="center">
                <AppText flex={1} color={Colors.WHITE}>
                  {item?.title}
                </AppText>
              </HStack>
            </AppTouchable>
            {index + 1 < pickerData?.length && <Divider my={scale(15)} />}
          </Fragment>
        ))}
      </VStack>
    </ActionSheetContainer>
  );
}
