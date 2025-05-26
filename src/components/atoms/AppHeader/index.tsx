import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeft} from '~/assets/svgs';
import {
  AppText,
  AppTouchable,
  Box,
  Divider,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize, width} from '~/utils/style';

type ScreensHeaderProps = {
  rightHeader?: JSX.Element;
  leftHeader?: JSX.Element;
  centerHeader?: JSX.Element;
  backAction?: boolean;
  backgroundColor?: string;
  title?: string | null;
  subTitle?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleFontFamily?: keyof FontFamily;
  titleTextAlign?: TextStyle['textAlign'];
  subTitleColor?: string;
  subTitleFontSize?: number;
  subTitleFontFamily?: keyof FontFamily;
  subTitleTextAlign?: TextStyle['textAlign'];
  titleStyle?: TextStyle;
  height?: ViewStyle['height'];
  contentColor?: string;
  pb?: ViewStyle['paddingBottom'];
  zIndex?: number;
  position?: 'absolute' | 'relative';
  backActionHandler?: () => void;
  centerHeaderAlignItems?: 'center' | 'flex-end' | 'flex-start';
  border?: boolean;
};

export default function AppHeader(props: ScreensHeaderProps) {
  const {goBack} = useNavigation();

  const {
    rightHeader,
    leftHeader,
    centerHeader,
    backAction,
    backgroundColor = Colors.WHITE,
    title,
    subTitle,
    titleColor = Colors.BLACK,
    titleFontSize = fontSize.medium,
    titleFontFamily = 'semiBold',
    titleTextAlign = 'center',
    subTitleColor = Colors.WHITE,
    subTitleFontSize = fontSize.xTiny,
    subTitleFontFamily = 'regular',
    subTitleTextAlign = 'center',
    height = 52,
    contentColor = Colors.BLACK,
    backActionHandler = goBack,
    pb = 14,
    zIndex,
    position,
    centerHeaderAlignItems = 'flex-end',
    border,
  } = props;

  const insets = useSafeAreaInsets();

  const goBackAction = () => {
    if (backActionHandler) {
      backActionHandler();
    } else {
      goBack?.();
    }
  };

  return (
    <VStack
      zIndex={zIndex}
      position={position}
      w={width}
      top={position === 'absolute' ? insets.top : undefined}>
      <HStack h={height} px={4} alignItems="center" bg={backgroundColor}>
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
              justifyContent="flex-end">
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
                <ArrowLeft />
              </AppTouchable>
            </Box>
          )
        )}
      </HStack>
      {border && <Divider />}
    </VStack>
  );
}
