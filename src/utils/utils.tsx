import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
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
import {StackNavigationOptions} from '@react-navigation/stack';
import {SheetManager} from 'react-native-actions-sheet';
import {Error, InfoCircle, TickCircle, Warning} from '~/assets/svgs';
import {queryClient} from '~/components/atoms/QueryClientProvider';
import {AgoraDropdownItem} from '~/components/ui';
import {screenTransitionConfig} from '~/navigation/methods';
import {userDataStore} from '~/stores';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import graphQLClient from '~/graphql/fetcher';

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
          text1Color: Colors.BLACK,
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
        backgroundColor: props.backgroundColor,
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
        backgroundColor: props.backgroundColor,
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
        backgroundColor: props.backgroundColor,
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
      icon: <TickCircle />,
      color: Colors.BLACK,
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
      icon: <Error />,
      color: Colors.WHITE,
      backgroundColor: Colors.WePeep,
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
      icon: <InfoCircle />,
      color: Colors.BACKGROUND,
      backgroundColor: Colors.Gainsboro,
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
      icon: <Warning />,
      color: Colors.BlanchedAlmond,
      backgroundColor: Colors.BlanchedAlmond,
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

// export const publicScreenOption: NativeStackNavigationOptions = {
//   animation: 'slide_from_right',
//   gestureEnabled: true,
//   gestureDirection: 'horizontal',
//   headerShown: false,
// };
export const publicScreenOption: StackNavigationOptions = {
  headerShown: false,
  ...screenTransitionConfig,
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

export function showSheet<T extends SheetNames>(
  name: T,
  payload?: Parameters<typeof SheetManager.show>[1],
) {
  return SheetManager.show(name, payload);
}

export function hideSheet<T extends SheetNames>(name: T) {
  return SheetManager.hide(name);
}

export function switchActions(
  newAction: SheetNames,
  oldAction: SheetNames = 'post-options-action',
  payload?: Parameters<typeof SheetManager.show>[1],
) {
  hideSheet(oldAction);
  setTimeout(() => {
    showSheet(newAction, payload);
  }, 300);
}

export const isTokenExpired = (token?: string | null): boolean => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (decoded.exp ?? 0) < Date.now() / 1000;
  } catch (err) {
    console.error('Invalid token:', err);
    return true;
  }
};

export function setHeader(token: string) {
  graphQLClient.setHeader('authorization', 'Bearer ' + token);
}

export async function logout() {
  setHeader('');
  queryClient.cancelQueries();
  queryClient.clear();
  userDataStore.getState()?.resetAuthData();
  userDataStore.getState()?.resetUserData();
  userDataStore?.setState({isUserLoggedIn: false});
}
