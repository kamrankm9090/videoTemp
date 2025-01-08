import {
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const useGetStatusBarHeight = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return {
    statusBarHeight: statusBarHeight || initialWindowMetrics?.insets?.top || 0,
  };
};
