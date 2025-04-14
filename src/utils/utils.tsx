import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React from 'react';
import {Keyboard, Linking} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import {
  ExternalCachesDirectoryPath,
  MainBundlePath,
  copyFileAssets,
  exists,
} from 'react-native-fs';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';
import {AppToast, OptionalToast} from '~/components';
import {Colors} from '~/styles';
import {isAndroid, isIos} from './helper';

import {AgoraDropdownItem} from '~/components/ui';

export const toastConfig = {
  success: (props: ToastProps) => <BaseToast {...props} />,
  error: (props: ToastProps) => <ErrorToast {...props} />,
  baseError: ({text1, text2, props}: any) => {
    return (
      <AppToast
        {...{
          text1,
          text2,
          icon: props.icon,
          color: props.color,
          onPress: props.onPress,
          backgroundColor: props.backgroundColor,
          text1Color: Colors.WHITE,
        }}
      />
    );
  },
  baseSuccess: ({text1, text2, props}: any) => (
    <AppToast
      {...{
        text1,
        text2,
        text1Color: props.color,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.SUCCESS,
      }}
    />
  ),
  baseSnackBar: ({text1, props}: any) => (
    <AppToast
      {...{
        text1,
        icon: props.icon,
        text1Color: props.color,
        backgroundColor: Colors.LABEL,
        top: 0,
      }}
    />
  ),
  baseInfo: ({text1, text2, props}: any) => (
    <AppToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.INFO,
      }}
    />
  ),
  baseAlert: ({text1, text2, props}: any) => (
    <AppToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.WARNING,
      }}
    />
  ),
  baseNotification: ({text1, text2, props}: any) => (
    <AppToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.WHITE,
      }}
    />
  ),
  baseOptional: ({text1, text2, props}: any) => (
    <OptionalToast
      {...{
        text1,
        text2,
        onClose: props.onClose,
        onEdit: props.onEdit,
        onDelete: props.onDelete,
      }}
    />
  ),
};

export function showSuccessMessage(
  message: any = 'Success',
  message2?: any,
  icon?: any,
  autoHide: boolean = true,
) {
  Toast.show({
    autoHide: autoHide,
    type: 'baseSuccess',
    text1: message,
    text2: message2,
    position: 'top',
    props: {
      icon,
      color: Colors.WHITE,
    },
  });
}

export function showErrorMessage(
  message: any = 'Error',
  message2?: any,
  icon?: any,
  autoHide: boolean = true,
) {
  Toast.show({
    autoHide: autoHide,
    type: 'baseError',
    text1: message,
    text2: message2,
    position: 'top',
    props: {
      icon,
      color: Colors.WHITE,
      backgroundColor: Colors.ERROR_BACKGROUND,
    },
  });
}

export function showInfoMessage(
  message: any = '',
  message2?: any,
  icon?: any,
  autoHide: boolean = true,
) {
  Toast.show({
    autoHide: autoHide,
    type: 'baseInfo',
    text1: message,
    text2: message2,
    position: 'top',
    props: {
      icon,
      color: Colors.BACKGROUND,
    },
  });
}

export function showWarningMessage(
  message: any = '',
  message2?: any,
  icon?: any,
  autoHide: boolean = true,
) {
  Toast.show({
    autoHide: autoHide,
    type: 'baseAlert',
    text1: message,
    text2: message2,
    position: 'top',
    props: {
      icon,
      color: Colors.BACKGROUND,
    },
  });
}

export function showSnackBar(
  message: any = 'Success',
  icon?: any,
  autoHide: boolean = true,
) {
  Toast.show({
    autoHide: autoHide,
    type: 'baseSnackBar',
    text1: message,
    position: 'bottom',
    props: {icon, color: Colors.WHITE},
  });
}

export function showOptionalMessage({
  text1,
  text2,
  onClose,
  onEdit,
  onDelete,
  autoHide = false,
  position = 'top',
}: any) {
  Toast.show({
    autoHide: autoHide,
    type: 'baseOptional',
    text1: text1,
    text2: text2,
    position: position,
    topOffset: isIos ? 10 : 0,
    props: {onClose, onEdit, onDelete},
  });
}

export const publicTabScreenOption: BottomTabNavigationOptions = {
  headerShown: false,
  lazy: true,
  tabBarStyle: {backgroundColor: 'transparent', elevation: 0}, // Remove default styles
  ...CommonActions,
};

export const publicScreenOption: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  headerShown: false,
};

export function openCall(phoneNumber: string) {
  Linking.openURL(`tel:${phoneNumber}`);
}

export function openMail(emailAddress: string) {
  Linking.openURL(`mailto:${emailAddress}`);
}

export function appFormatDate(date: any, dateFormat: string = 'HH:mm a') {
  return dayjs(date).format(dateFormat);
}

export function dismissKeyboard() {
  Keyboard.dismiss();
}

export async function generateThumbnail(path: string, timeStamp: string) {
  if (!path) {
    return;
  }

  try {
    const response = await createThumbnail({
      url: path,
      timeStamp: parseInt(timeStamp, 10),
    });
    return response.path;
  } catch (err) {
    console.error(err);
  } finally {
    // setIsLoading(false);
  }
}

export const objectToItems = (object: any): AgoraDropdownItem[] => {
  return Object.keys(object).map(value => {
    return {
      label: value,
      value: object[value],
    };
  });
};

export const arrayToItems = (array: any[]): AgoraDropdownItem[] => {
  return array.map(value => {
    return {
      label: value.toString(),
      value: value,
    };
  });
};

export const enumToItems = (enumType: any): AgoraDropdownItem[] => {
  const entries = Object.entries(enumType);
  const items = entries.filter(([, value]) => typeof value === 'number');
  items.sort((a: any, b: any) => a[1] - b[1]);
  return items.map(([key, value]) => ({
    label: key,
    value: value,
  }));
};

export function getResourcePath(fileName: string): string {
  if (isAndroid) {
    return `/assets/${fileName}`;
  }
  return `${MainBundlePath}/${fileName}`;
}

export async function getAbsolutePath(filePath: string): Promise<string> {
  if (isAndroid) {
    if (filePath.startsWith('/assets/')) {
      // const fileName = filePath;
      const fileName = filePath.replace('/assets/', '');
      const destPath = `${ExternalCachesDirectoryPath}/${fileName}`;
      if (!(await exists(destPath))) {
        await copyFileAssets(fileName, destPath);
      }
      return destPath;
    }
  }
  return filePath;
}
