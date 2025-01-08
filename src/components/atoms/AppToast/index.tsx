import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {fontSize, scale, verticalScale} from '~/utils/style';

type Props = {
  text1: string;
  text2?: string;
  icon?: JSX.Element;
  backgroundColor: string;
  color?: string;
  text1Color?: string;
  top?: number;
  onPress?: () => void;
};

export default function AppToast({
  text1,
  text2,
  icon,
  backgroundColor = Colors.SUCCESS,
  color = Colors.WHITE,
  text1Color = Colors.BLACK,
  top,
  onPress,
}: Props) {
  const {statusBarHeight} = useGetStatusBarHeight();

  const marginTop = text2 ? 6 : -3;

  return (
    <View
      style={[
        {backgroundColor, top: top ?? statusBarHeight},
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 12,
  },
  container: {
    borderRadius: 8,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    width: '90%',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  direction: {
    flexDirection: 'row',
  },
});
