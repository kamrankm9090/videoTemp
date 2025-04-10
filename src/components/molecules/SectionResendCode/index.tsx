import React, {useEffect, useState} from 'react';
import {AppText, AppTouchable, Center, HStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function SectionResendCode({email}: {email: string}) {
  const [timer, setTimer] = useState(120);
  const [enabled, setIsEnabled] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  function resetTimer() {
    setTimer(120);
    setIsEnabled(false);
  }

  useEffect(() => {
    if (timer === 0) {
      setIsEnabled(true);
    }
  }, [timer]);

  function resendCodeOnPress() {
    resetTimer();
  }

  const text = 'Didn’t receive code?';

  return (
    <HStack space={4} justifyContent="center">
      <AppText color={Colors.GAINSBORO}>{text}</AppText>
      <AppTouchable disabled={!enabled} onPress={resendCodeOnPress}>
        <AppText
          underline
          color={enabled ? Colors.PRIMARY : Colors.GAINSBORO}
          fontFamily="medium"
          fontSize={fontSize.small}>
          {timer > 0
            ? `Resend (${Math.floor(timer / 60)}:${(timer % 60)
                .toString()
                .padStart(2, '0')})`
            : 'Resend'}
        </AppText>
      </AppTouchable>
    </HStack>
  );
}
