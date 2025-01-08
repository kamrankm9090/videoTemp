import {yupResolver} from '@hookform/resolvers/yup';
import {Platform} from 'react-native';
import * as Yup from 'yup';
import config from '~/config';

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

// form helper
export {useForm} from 'react-hook-form';
export {Yup, yupResolver};
