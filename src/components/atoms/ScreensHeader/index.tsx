import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ChevronBack} from '~/assets/svgs';
import {AppText, AppTouchable, Box, HStack, VStack} from '~/components';
import {goBack} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

type TextAlign = 'auto' | 'center' | 'justify' | 'left' | 'right';

type Props = {
  rightHeader?: JSX.Element;
  leftHeader?: JSX.Element;
  centerHeader?: JSX.Element;
  backAction?: boolean;
  backgroundColor?: string;
  title?: any;
  subTitle?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleFontFamily?: any;
  titleTextAlign?: TextAlign;
  subTitleColor?: string;
  subTitleFontSize?: number;
  subTitleFontFamily?: any;
  subTitleTextAlign?: TextAlign;
  titleStyle?: TextStyle;
  height?: ViewStyle['height'];
  pb?: ViewStyle['paddingBottom'];
  mt?: ViewStyle['marginTop'];
  zIndex?: number;
  position?: 'absolute' | 'relative';
  backActionHandler?: () => void;
  centerHeaderAlignItems?: 'center' | 'flex-end' | 'flex-start';
};

const ScreensHeader = (props: Props) => {
  const {
    rightHeader,
    leftHeader,
    centerHeader,
    backAction,
    backgroundColor = Colors.BACKGROUND,
    title,
    subTitle,
    titleColor = Colors.WHITE,
    titleFontSize = fontSize.large,
    titleFontFamily = fontFamily.medium,
    titleTextAlign = 'center',
    subTitleColor = Colors.GARY_3,
    subTitleFontSize = fontSize.xTiny,
    subTitleFontFamily = fontFamily.regular,
    subTitleTextAlign = 'center',
    height = 55,
    backActionHandler,
    pb = 14,
    mt,
    zIndex,
    position,
    centerHeaderAlignItems = 'flex-end',
  } = props;

  const insets = useSafeAreaInsets();

  const goBackAction = () => {
    if (backActionHandler) {
      backActionHandler();
    } else {
      goBack();
    }
  };

  return (
    <HStack
      zIndex={zIndex}
      position={position}
      top={position === 'absolute' ? insets.top : undefined}
      h={height}
      px={4}
      mt={mt}
      alignItems="center"
      bg={backgroundColor}>
      {rightHeader && (
        <Box position="absolute" zIndex={4} right={16}>
          {rightHeader}
        </Box>
      )}
      {centerHeader ? (
        <HStack
          alignItems={centerHeaderAlignItems}
          h="100%"
          flex={1}
          pb={pb}
          justifyContent="center">
          {centerHeader}
        </HStack>
      ) : (
        title && (
          <VStack
            alignItems="center"
            h="100%"
            flex={1}
            pb={12}
            space={1}
            justifyContent={'flex-end'}>
            <AppText
              color={titleColor}
              fontSize={titleFontSize}
              textAlign={titleTextAlign}
              fontFamily={titleFontFamily}>
              {title}
            </AppText>
            {subTitle && (
              <AppText
                color={subTitleColor}
                fontSize={subTitleFontSize}
                textAlign={subTitleTextAlign}
                fontFamily={subTitleFontFamily}>
                {subTitle}
              </AppText>
            )}
          </VStack>
        )
      )}
      {leftHeader ? (
        <Box position="absolute" zIndex={4} left={16}>
          {leftHeader}
        </Box>
      ) : (
        backAction && (
          <Box position="absolute" zIndex={4} left={16}>
            <AppTouchable onPress={goBackAction}>
              <ChevronBack />
            </AppTouchable>
          </Box>
        )
      )}
    </HStack>
  );
};

export default ScreensHeader;
