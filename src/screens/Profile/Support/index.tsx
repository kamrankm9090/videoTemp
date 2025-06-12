import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {MessageSentIcon} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppFormProvider,
  AppHeader,
  AppKeyboardAwareScrollView,
  AppText,
  Center,
  FormInput,
  ModalContainer,
  VStack,
} from '~/components';
import {EmailInput, useEmail_SendEmailMutation} from '~/graphql/generated';
import {goBack, replace, resetRoot} from '~/navigation/methods';
import {supportSchema} from '~/schemas';
import {Colors} from '~/styles';
import {fontSize, height, scale, width} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {
  subject: '',
  plainTextContent: '',
};

const SupportScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {mutate: mutateSendSupport, isLoading: isLoadingSendSupport} =
    useEmail_SendEmailMutation();
  const {...methods} = useForm({
    resolver: yupResolver(supportSchema),
    defaultValues,
  });

  const {handleSubmit, formState, setValue, watch} = methods;

  const onSubmit = useCallback((formData: typeof defaultValues) => {
    const emailInput: EmailInput = {
      subject: formData?.subject,
      plainTextContent: formData?.plainTextContent,
      toEmailAddress: 'nasim.a@ifuturesoftware.com',
    };
    mutateSendSupport(
      {emailInput},
      {
        onSuccess: response => {
          if (response?.email_sendEmail?.status?.code === 1) {
            setIsVisible(true);
          } else {
            showErrorMessage(response?.email_sendEmail?.status?.description);
          }
        },
      },
    );
  }, []);

  function onCloseModal() {
    setIsVisible(false);
    setTimeout(() => {
      resetRoot('MainTabs', {
        screen: 'ProfileTab',
      });
    }, 250);
  }

  return (
    <AppContainer>
      <AppHeader
        title="Support"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppFormProvider methods={methods}>
        <AppKeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack mb={16} space={35}>
            <VStack space={scale(10)}>
              <Item title="Email Address" description="Info@Example.com" />
              <Item title="Contact us" description="+1 (555) 4543657678" />
            </VStack>

            <VStack space={scale(16)}>
              <AppText>Send Us A Message</AppText>
              <FormInput
                mandatory
                name="subject"
                placeholder="Subject"
                {...{formState}}
              />

              <FormInput
                mandatory
                name="plainTextContent"
                placeholder="Message"
                multiline
                textArea
                {...{formState}}
              />
            </VStack>

            <AppButton
              mt={24}
              title="Send"
              loading={isLoadingSendSupport}
              onPress={handleSubmit(onSubmit)}
            />
          </VStack>
        </AppKeyboardAwareScrollView>
      </AppFormProvider>

      <ModalContainer
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={1}
        isVisible={isVisible}>
        <VStack
          justifyContent="space-around"
          alignItems="center"
          h={height * 0.7}>
          <Center>
            <MessageSentIcon />
          </Center>
          <VStack justifyContent="center" alignItems="center" space={scale(15)}>
            <AppText fontSize={fontSize.xxLarge} color={Colors.WHITE}>
              Your Message was Sent!
            </AppText>
            <AppText fontSize={fontSize.medium} color={Colors.PLACEHOLDER}>
              We will answer you as soon as possible
            </AppText>
          </VStack>
          <AppButton mt={24} title="Back to Profile" onPress={onCloseModal} />
        </VStack>
      </ModalContainer>
    </AppContainer>
  );
};

export default SupportScreen;

const Item = ({title, description}: {title: string; description: string}) => {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      h={scale(100)}
      borderRadius={scale(7.5)}
      space={scale(15)}
      w={width * 0.9}
      bg={Colors.NERO}>
      <AppText fontSize={fontSize.small} color={Colors.PLACEHOLDER}>
        {title}
      </AppText>
      <AppText fontSize={fontSize.normal}>{description}</AppText>
    </VStack>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
