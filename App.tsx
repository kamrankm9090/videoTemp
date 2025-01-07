import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from '~/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
