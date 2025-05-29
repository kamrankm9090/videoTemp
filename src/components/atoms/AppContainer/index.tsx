import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';

type Props = {
  children?: React.ReactNode;
  isLoading?: boolean;
  safeArea?: boolean;
  backgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  statusBarBackgroundColor?: string;
  isStatusBarHeight?: boolean;
  loadingComponent?: React.ReactNode;
};

export default function AppContainer(props: Props) {
  const {
    children,
    isLoading,
    safeArea = true,
    backgroundColor = Colors.BACKGROUND,
    statusBarBackgroundColor,
    barStyle = 'light-content',
    isStatusBarHeight = false,
    loadingComponent,
  } = props;

  const [isLoadScreen, setIsLoadScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadScreen(true);
    }, 5);
    return () => clearTimeout(timer);
  }, []);

  const {statusBarHeight} = useGetStatusBarHeight();
  const Loader = loadingComponent ?? <AppLoading />;

  const content = (
    <>
      {isLoading && Loader}
      {!isLoading && (isLoadScreen ? children : Loader)}
    </>
  );

  if (safeArea) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {backgroundColor: backgroundColor, paddingTop: statusBarHeight},
        ]}>
        <StatusBar
          translucent
          barStyle={barStyle}
          backgroundColor={
            statusBarBackgroundColor || backgroundColor || Colors.BLACK
          }
        />
        {content}
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
        barStyle={barStyle}
        backgroundColor={statusBarBackgroundColor ?? Colors.BLACK}
      />
      {content}
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
