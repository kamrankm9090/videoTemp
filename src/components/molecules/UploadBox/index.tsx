import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Image, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {AppText, AppTouchable, VStack} from '~/components';
import {useUploadFile} from '~/hooks';
import {Colors} from '~/styles';

interface UploadBoxProps {
  name: string;
  label?: string;
}

export default function UploadBox({name, label}: UploadBoxProps) {
  const {control} = useFormContext();
  const {mutate: uploadFileMutate, isLoading: uploading} = useUploadFile();

  const handleUpload = (image: any): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      if (!image?.path) {
        reject(new Error('No image selected'));
        return;
      }

      uploadFileMutate(
        { param: image },
        {
          onSuccess: (data: any) => {
            if (data?.uploadedUrl) {
              resolve(data.uploadedUrl);
            } else {
              resolve(undefined);
            }
          },
          onError: error => {
            console.error('Upload failed:', error);
            reject(error);
          },
        },
      );
    });
  };

  const handlePickImage = async (onChange: (uri: string) => void) => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.8,
      });

      const url = await handleUpload(image);
      if (url) {
        onChange(url);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <VStack space={8}>
          <AppTouchable
            onPress={() => handlePickImage(onChange)}
            h={120}
            borderWidth={1}
            borderRadius={8}
            borderColor={Colors.GARY_3}
            justifyContent="center"
            alignItems="center"
            borderStyle="dashed"
            disabled={uploading}>
            {value ? (
              <Image
                source={{uri: value}}
                resizeMode="cover"
                style={styles.image}
              />
            ) : (
              <VStack alignItems="center" space={4}>
                <AppText fontSize={12} color={Colors.GARY_2}>
                  Add photo
                </AppText>
              </VStack>
            )}
          </AppTouchable>
        </VStack>
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
