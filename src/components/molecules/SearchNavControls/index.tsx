import React from 'react';
import {StyleSheet} from 'react-native';
import {ArrowLeft} from '~/assets/svgs';
import {AppTouchable, VStack} from '~/components';
import { Colors } from '~/styles';

const SearchNavControls = ({onPrev, onNext}: any) => {
  return (
    <VStack position="absolute" right={10} bottom={10} style={styles.container}>
      <AppTouchable style={styles.button} onPress={onPrev}>
        <ArrowLeft transform={[{rotate: '90deg'}]} />
      </AppTouchable>

      <AppTouchable style={styles.button} onPress={onNext}>
        <ArrowLeft transform={[{rotate: '270deg'}]} />
      </AppTouchable>
    </VStack>
  );
};

export default SearchNavControls;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    bottom: 100, // adjust based on screen height or footer height
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.NERO,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
