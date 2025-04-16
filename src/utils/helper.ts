import {yupResolver} from '@hookform/resolvers/yup';
import {Platform} from 'react-native';
import * as Yup from 'yup';
import config from '~/config';
import {v4 as uuidv4} from 'uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import {showSuccessMessage} from './utils';

export function generateUuid() {
  return uuidv4().replace(/-/g, '');
}

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export async function reportError(error: unknown, message: string) {
  //console.log('error-->', error, ' message-->', message)
}

export function getFullImageUrl(url?: string | undefined | null) {
  if (url) {
    if (url?.startsWith?.('https') || url?.startsWith?.('http')) {
      return url;
    }
    return url && `${config.cdnURL}${url}`;
  }
  return;
}

export function getAspectRatio(width: number, height: number) {
  if (height > 0) {
    return width / height;
  }
  return 1;
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function copyToClipBoard({
  value,
  message = 'Copied',
}: {
  value: string;
  message?: string | null;
}) {
  Clipboard.setString(value);
  message && showSuccessMessage(message);
}

// form helper
export {useForm} from 'react-hook-form';
export {Yup, yupResolver};
