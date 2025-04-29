import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {AppText, Center, ModalContainer, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

type Props = {
  onClose?: () => void;
  counter?: number;
  visible: boolean;
  duration?: number;
};

export default function CounterModal({
  onClose,
  counter = 3,
  visible,
  duration = 1300,
}: Props) {
  const modalRef = useRef<ModalRef>(null);
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (visible) {
      modalRef?.current?.open();
    } else {
      modalRef?.current?.close();
      onClose?.();
    }
  }, [visible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev < counter) {
          return prev + 1;
        } else {
          clearInterval(interval);
          onClose?.();
          return prev;
        }
      });
    }, duration);

    return () => clearInterval(interval);
  }, [counter, onClose, duration]);

  return (
    <ModalContainer ref={modalRef} onDismiss={onClose}>
      <TouchableWithoutFeedback onPress={onClose} style={styles.flex1}>
        <VStack flex={1} w="100%">
          <VStack
            alignItems="center"
            justifyContent="center"
            flex={1}
            w="100%"
            bg={Colors.TRANSPARENT}>
            <Center
              bg={Colors.BLACK_TRANSPARENT_2}
              rounded={'100%'}
              h={180}
              w={180}>
              <Center
                bg={Colors.BLACK_TRANSPARENT_4}
                rounded="100%"
                h={130}
                w={130}>
                <Center
                  bg={Colors.BLACK_TRANSPARENT_5}
                  rounded="100%"
                  h={72}
                  w={72}>
                  <AppText
                    fontSize={fontSize.xxxLarge}
                    fontFamily="medium"
                    color={Colors.WHITE}>
                    {count}
                  </AppText>
                  <Ring duration={duration} delay={0} />
                  <Ring duration={duration} delay={duration * 1} />
                  <Ring duration={duration} delay={duration * 2} />
                  <Ring duration={duration} delay={duration * 3} />
                </Center>
              </Center>
            </Center>
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
}

const Ring = ({delay, duration}: {delay: number; duration?: number}) => {
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });

  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: duration,
        }),
        -1,
      ),
    );
  }, [duration]);
  return <Animated.View style={[styles.ring, style]} />;
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 24,
  },
});
