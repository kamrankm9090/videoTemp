import {yupResolver} from '@hookform/resolvers/yup';
import Clipboard from '@react-native-clipboard/clipboard';
import {Platform} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import * as Yup from 'yup';
import config from '~/config';
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
  return num?.toString() ?? '0';
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

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
// form helper
export {useForm} from 'react-hook-form';
export {Yup, yupResolver};
