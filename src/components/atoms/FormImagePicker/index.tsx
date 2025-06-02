import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {Image as ImagePickerResponse} from 'react-native-image-crop-picker';
import {
  AppIndicator,
  AppText,
  AppTouchable,
  AttachmentPickerModal,
  Avatar,
  VStack,
} from '~/components';
import {useUploadFile} from '~/hooks/upload';

export interface FormImagePickerRef {
  openPicker: () => void;
}

interface FormImagePickerProps {
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
  RenderComponent?: React.ReactNode;
}

const FormImagePicker = forwardRef<FormImagePickerRef, FormImagePickerProps>(
  ({name, disabled, isLoading, RenderComponent}, ref) => {
    const {control} = useFormContext();
    const {field} = useController({control, name});
    const [visible, setVisible] = useState(false);

    const {mutate: uploadFileMutate, isLoading: uploading} = useUploadFile();

    const openPicker = () => {
      Keyboard.dismiss();
      setVisible(true);
    };

    const closePicker = () => {
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      openPicker,
    }));

    const handleUpload = (image: ImagePickerResponse) => {
      uploadFileMutate(
        {param: image},
        {
          onSuccess: (data: any) => {
            if (data?.uploadedUrl) {
              field.onChange(data.uploadedUrl);
            }
          },
        },
      );
    };

    return (
      <>
        <AppTouchable
          onPress={openPicker}
          disabled={disabled || uploading || isLoading}>
          {uploading || isLoading ? (
            <AppIndicator />
          ) : RenderComponent ? (
            RenderComponent
          ) : (
            <VStack>
              <Avatar />
              <AppText>Edit profile</AppText>
            </VStack>
          )}
        </AppTouchable>

        <AttachmentPickerModal
          visible={visible}
          onClose={closePicker}
          onChangeImage={handleUpload}
        />
      </>
    );
  },
);

export default FormImagePicker;
