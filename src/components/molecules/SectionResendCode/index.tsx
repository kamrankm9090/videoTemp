import React, {useEffect, useState} from 'react';
import {useSnapshot} from 'valtio';
import {AppText, AppTouchable, HStack} from '~/components';
import {useUser_SendVerificationCodeToEmailMutation} from '~/graphql/generated';
import {authenticationStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';

export default function SectionResendCode() {
  const [timer, setTimer] = useState(120);
  const [enabled, setIsEnabled] = useState(false);
  const {email} = useSnapshot(authenticationStore);
  const {
    mutate: mutateSendVerificationCode,
    isLoading: isLoadingSendVerificationCode,
  } = useUser_SendVerificationCodeToEmailMutation();

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
    const variables = {
      input: {
        isForResetPassword: true,
        email,
      },
    };
    mutateSendVerificationCode(variables, {
      onSuccess: response => {
        if (response?.user_sendVerificationCodeToEmail?.code === 1) {
          resetTimer();
          showSuccessMessage();
        } else {
          showErrorMessage(
            response?.user_sendVerificationCodeToEmail?.description,
          );
        }
      },
    });
  }

  const text = 'Didn’t receive code?';

  return (
    <HStack space={4} justifyContent="center">
      <AppText color={Colors.GAINSBORO}>{text}</AppText>
      <AppTouchable
        disabled={!enabled || isLoadingSendVerificationCode}
        onPress={resendCodeOnPress}>
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
