import {yupResolver} from '@hookform/resolvers/yup';
import Clipboard from '@react-native-clipboard/clipboard';
import {Platform} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import * as Yup from 'yup';
import config from '~/config';
import {showSuccessMessage} from './utils';
import dayjs from 'dayjs';

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

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function formatTimer(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export const getRandomColorFromName = (name: string): string => {
  const colors = ['#FF4C94', '#F9C74F', '#577590', '#D946EF', '#222222'];
  const charCode = name?.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

export function parseISODuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const [, h, m, s] = match || [];

  const hours = parseInt(h || '0', 10);
  const minutes = parseInt(m || '0', 10);
  // const seconds = parseInt(s || '0', 10);

  const time = dayjs().hour(hours).minute(minutes);

  const formattedTime = time.format('h:mm A');

  return formattedTime;
}

// form helper
export {useForm} from 'react-hook-form';
export {Yup, yupResolver};
