import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {AppIndicator} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';
import {height} from '~/utils/style';

interface Props {
  style?: ViewStyle;
  size?: IndicatorSize;
  color?: string;
  safeArea?: boolean;
}

export default function AppLoading({
  style = styles.loading,
  size = 'large',
  color = Colors.PRIMARY,
  safeArea = true,
}: Props) {
  const {statusBarHeight} = useGetStatusBarHeight();

  return (
    <View
      style={[
        style,
        ...(safeArea ? [{top: isAndroid ? statusBarHeight : undefined}] : []),
      ]}>
      <AppIndicator color={color} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    zIndex: 9999,
    width: '100%',
    height: height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SEMI_TRANSPARENT,
  },
});
