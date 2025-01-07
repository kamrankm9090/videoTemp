import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  children: ReactNode;
};

export default function AppContainer(props: Props) {
  const {children} = props;

  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
