import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppImage, AppText, AppTouchable, VStack} from '~/components';
import {Colors} from '~/styles';

interface UploadBoxProps {
  name: string;
  label?: string;
}

export default function UploadBox({name, label}: UploadBoxProps) {
  const {control} = useFormContext();

  const handlePickImage = (onChange: (uri: string) => void) => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (res.assets?.[0]?.uri) {
        onChange(res.assets[0].uri);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <VStack space={8}>
          {label && <AppText fontSize={14}>{label}</AppText>}

          <AppTouchable
            onPress={() => handlePickImage(onChange)}
            h={120}
            borderWidth={1}
            borderRadius={8}
            borderColor={Colors.GARY_3}
            justifyContent="center"
            alignItems="center"
            borderStyle="dashed">
            {value ? (
              <AppImage
                imageSource={{uri: value}}
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
