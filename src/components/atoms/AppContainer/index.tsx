import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';

type Props = {
  children?: ReactChildren;
  isLoading?: boolean;
  safeArea?: boolean;
  backgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  statusBarBackgroundColor?: string;
  isStatusBarHeight?: boolean;
};

export default function AppContainer(props: Props) {
  const {
    children,
    isLoading,
    safeArea = true,
    backgroundColor = Colors.WHITE,
    statusBarBackgroundColor,
    barStyle,
    isStatusBarHeight = false,
  } = props;

  const [isLoadScreen, setIsLoadScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadScreen(true);
    }, 5);
  }, []);

  const {statusBarHeight} = useGetStatusBarHeight();

  if (safeArea) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {backgroundColor: backgroundColor, paddingTop: statusBarHeight},
        ]}>
        <StatusBar
          translucent
          barStyle={barStyle ?? 'dark-content'}
          backgroundColor={
            statusBarBackgroundColor || backgroundColor || Colors.BLACK
          }
        />
        {isLoading && <AppLoading />}
        {isLoadScreen ? children : <AppLoading />}
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        isStatusBarHeight && {paddingTop: statusBarHeight},
      ]}>
      <StatusBar
        translucent
        barStyle={barStyle ?? 'light-content'}
        backgroundColor={statusBarBackgroundColor ?? Colors.BLACK}
      />
      {isLoading && <AppLoading />}
      {isLoadScreen ? children : <AppLoading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
