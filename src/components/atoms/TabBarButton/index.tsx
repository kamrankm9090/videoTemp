import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function TabBarButton(props: any) {
  const {onPress, children, style = styles.container} = props;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});
