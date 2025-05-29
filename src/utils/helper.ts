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

export const IS_DEV = __DEV__;

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

export const formatTimeAgo = (timestamp: string | number | Date): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000);

  if (diffInSeconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

export function formatViewCount(count?: number): string {
  if (typeof count !== 'number') return '0 views';

  let formatted: string;

  if (count >= 1_000_000) {
    formatted = (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (count >= 1_000) {
    formatted = (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    formatted = count.toLocaleString();
  }

  const label = count === 1 ? 'viewer' : 'viewers';
  return `${formatted} ${label}`;
}

export function getAvatarInitial(title?: string): string {
  if (!title || typeof title !== 'string') return '';
  return title.trim().charAt(0).toUpperCase();
}
