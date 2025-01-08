import {useNavigation} from '@react-navigation/native';
import React, {ReactNode} from 'react';
import {Keyboard, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import {AppButton, AppLink, AppText, Box, Center, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

type NoDataProps = {
  text?: string | null;
  description?: string | null;
  flex?: number;
  inverted?: boolean;
  showText?: boolean;
  showDescription?: boolean;
  customIcon?: JSX.Element;
  showButton?: boolean;
  showLink?: boolean;
  showIcon?: boolean;
  px?: ViewStyle['paddingHorizontal'];
  buttonOnPress?: () => void;
  buttonTitle?: string | null;
  linkText?: string | null;
  linkOnPress?: () => void;
  customAsset?: JSX.Element;
  height?: number;
  children?: ReactNode;
};

export default function NoData(props: NoDataProps) {
  const {goBack} = useNavigation();

  const {
    text = 'No results',
    description,
    flex = 1,
    inverted,
    showText = true,
    showDescription = true,
    customIcon,
    showButton,
    showLink,
    showIcon,
    buttonOnPress = goBack,
    buttonTitle = 'Back',
    linkOnPress,
    linkText,
    px,
    customAsset,
    height,
    children,
  } = props;

  function buttonOnPressHandler() {
    buttonOnPress?.();
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box h={height} flex={flex} px={px}>
        <Center flex={flex} inverted={inverted}>
          {showIcon && customIcon}
          <VStack px={20} space={4}>
            {showText && (
              <AppText
                marginTop={28}
                textAlign="center"
                color={Colors.BLACK}
                fontSize={fontSize.xMedium}>
                {text}
              </AppText>
            )}
            {showDescription && (
              <AppText
                marginTop={12}
                textAlign="center"
                color={Colors.DISABLE}
                fontSize={fontSize.normal}
                lineHeight={28}>
                {description}
              </AppText>
            )}
            {customAsset}
            {showLink && (
              <Center>
                <AppLink text={linkText} onPress={linkOnPress} />
              </Center>
            )}
            {children}
          </VStack>
        </Center>
        {showButton && (
          <AppButton title={buttonTitle} onPress={buttonOnPressHandler} />
        )}
      </Box>
    </TouchableWithoutFeedback>
  );
}
