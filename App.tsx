import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from '~/navigation/AppNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClientProvider} from '~/components';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider>
      <GestureHandlerRootView style={styles.flex1}>
        <BottomSheetModalProvider>
          <AppNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
