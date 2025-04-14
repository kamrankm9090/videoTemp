import {StatusBar} from 'react-native';
import {isIos} from '~/utils/helper';

export const useGetStatusBarHeight = () => {
  if (isIos) {
    return {statusBarHeight: 44};
  }

  return {statusBarHeight: StatusBar.currentHeight};
};

// import {
//   initialWindowMetrics,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// export const useGetStatusBarHeight = () => {
//   const insets = useSafeAreaInsets();
//   const statusBarHeight = insets.top;

//   return {
//     statusBarHeight: statusBarHeight || initialWindowMetrics?.insets?.top || 0,
//   };
// };
