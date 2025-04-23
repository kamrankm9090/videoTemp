import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useCallback, useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import 'react-native-url-polyfill/auto';
import 'sheets.tsx';
import {QueryClientProvider} from '~/components';
import AppNavigator from '~/navigation/AppNavigator';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {setHeader, toastConfig} from '~/utils/utils';

function App(): React.JSX.Element {
  const {authData} = userDataStore(state => state);

  const handleAuth = useCallback(() => {
    if (authData?.token) {
      setHeader(authData?.token);
    }
  }, [authData]);

  useLayoutEffect(() => {
    handleAuth();
  }, [handleAuth]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <GestureHandlerRootView style={styles.flex1}>
          <SheetProvider>
            <BottomSheetModalProvider>
              <AppNavigator />
              <Toast config={toastConfig} />
            </BottomSheetModalProvider>
          </SheetProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});
