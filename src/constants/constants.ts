import {Options as ImagePickerOptions} from 'react-native-image-crop-picker';

export const storageKeysToKeep = ['isOnboardingViewed'];

export const appId = 'b3e2f575c91a4da6bcefd4612aeefde3';
export const agoraTempToken =
  '006b3e2f575c91a4da6bcefd4612aeefde3IACuPiEvcXaYy2BNBmEL57MsQ7Bt5xgfNBm8bd4Z8uFWQD/KPLkAAAAAIgAdy76jWgvYZwQA6AMBAAAAAgABAAAAAwABAAAABAABAAAA';
export const channelName = 'testKamran';

export const PAGE_SIZE = 10;

export const cropPickerOptions: ImagePickerOptions = {
  width: 1920,
  height: 1080,
  cropping: true,
  mediaType: 'photo',
  forceJpg: true,
  hideBottomControls: true,
};

export const pickerOptions: ImagePickerOptions = {
  cropping: false,
  mediaType: 'photo',
  forceJpg: true,
  hideBottomControls: true,
};
