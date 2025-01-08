import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import {isAndroid} from './helper';

export const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5 screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const screenSize = Math.sqrt(width * height) / 100;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const scaleSpace = (size: number) => {
  ((height / guidelineBaseHeight) * size)?.toFixed(2);
};
const scaleSpaceW = (size: number) => {
  (width / guidelineBaseWidth) * size;
};

const windowAspectRatio = height / width;

const headerHeight = height > 700 ? verticalScale(40) : verticalScale(20);

const myCourseWidth = width * 0.7 + 24;
const myCourseWidthVertical = '100%';

const fontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

const fontFamily: FontFamily = {
  bold: 'HelveticaNeue-Bold',
  light: 'HelveticaNeue-Light',
  medium: 'HelveticaNeue-Medium',
  regular: 'HelveticaNeue-Roman',
  thin: 'HelveticaNeue-Thin',
};

const fontSize: FontSize = {
  extraLarge: scale(36),
  xxxxLarge: scale(34),
  tooLarge: scale(27),
  xxxLarge: scale(24),
  xxLarge: scale(22),
  xLarge: scale(20),
  large: scale(18),
  xMedium: scale(17),
  medium: scale(16),
  xNormal: scale(15),
  normal: scale(14),
  small: scale(13),
  tiny: scale(12),
  xTiny: scale(11),
  xxTiny: scale(10),
  xxxTiny: scale(8),
  heading1: scale(56),
  heading2: scale(48),
  heading3: scale(40),
  heading4: scale(32),
  heading5: scale(24),
  heading6: scale(20),
};

const shadowRadius = {
  1: 1.0,
  2: 1.41,
  3: 2.22,
  4: 2.62,
  5: 3.84,
  6: 4.65,
  7: 4.65,
  8: 4.65,
  9: 5.46,
  10: 6.27,
  11: 6.68,
  12: 7.49,
  13: 8.3,
  14: 9.11,
  15: 9.51,
  16: 10.32,
  17: 11.14,
  18: 11.95,
  19: 12.35,
  20: 13.16,
  21: 13.97,
  22: 14.78,
  23: 15.19,
  24: 16.0,
};

const generateShadowUsingNumber = (
  shadow: number,
  color: string = Colors.BLACK,
) => {
  const baseShadowOpacity = 0.18;
  const level = Math.floor(shadow / 4);

  function generateShadowRadius(shadowNumber: number) {
    if (level <= 24 && level > 0) {
      return shadowRadius[shadowNumber];
    } else {
      const baseRadius = 5.46;
      const increment = 0.84;
      return baseRadius + (level - 9) * increment;
    }
  }

  const shadowProperties = {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: Math.floor(shadow / 2),
    },
    shadowOpacity:
      Math.round((baseShadowOpacity + (shadow * 2 - 2 - level) / 100) * 100) /
      100,
    shadowRadius: generateShadowRadius(shadow),
    elevation: shadow,
  };

  return shadowProperties;
};

const globalStyles = StyleSheet.create({
  inverted: {
    transform: [{rotateX: '-180deg'}, ...(isAndroid ? [{scaleX: -1}] : [])],
  },
});

export {
  fontFamily,
  scaleSpace,
  scale,
  verticalScale,
  moderateScale,
  screenSize,
  scaleSpaceW,
  fontWeight,
  fontSize,
  headerHeight,
  windowAspectRatio,
  myCourseWidth,
  myCourseWidthVertical,
  generateShadowUsingNumber,
  globalStyles,
};
