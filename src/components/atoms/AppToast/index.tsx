import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Close, CloseCircle} from '~/assets/svgs';
import {AppText, AppTouchable} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {fontSize, scale, verticalScale} from '~/utils/style';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';

type Props = {
  text1: string;
  text2?: string;
  icon?: JSX.Element;
  backgroundColor: string;
  color?: string;
  text1Color?: string;
  top?: number;
  onPress?: () => void;
  closeIcon?: JSX.Element;
  closeAction?: () => void;
};

export default function AppToast({
  text1,
  text2,
  icon,
  backgroundColor = Colors.CosmicLatte,
  color = Colors.BLACK,
  text1Color = Colors.BLACK,
  top,
  onPress,
  closeIcon = <Close />,
  closeAction = () => Toast.hide(),
}: Props) {
  const {statusBarHeight} = useGetStatusBarHeight();

  const marginTop = text2 ? 6 : -3;

  return (
    <View
      style={[
        {backgroundColor, top: top || statusBarHeight},
        styles.container,
      ]}>
      <View style={styles.direction}>
        {icon && <View style={{marginTop}}>{icon}</View>}
        <ScrollView style={styles.scrollView}>
          <AppText fontSize={fontSize.small} flex={1} color={text1Color}>
            {text1}
          </AppText>
          {text2 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              disabled={!onPress}>
              <AppText marginTop={2} fontSize={fontSize.small} color={color}>
                {text2}
              </AppText>
            </TouchableOpacity>
          )}
        </ScrollView>
        <AppTouchable onPress={closeAction}>{closeIcon}</AppTouchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 12,
  },
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    width: '100%',
    minHeight: 72,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  direction: {
    flexDirection: 'row',
  },
});
