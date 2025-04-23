import React from 'react';
import {StyleSheet} from 'react-native';
import BouncyCheckbox, {
  BouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const AppCheckBox = React.forwardRef(
  (
    {
      iconStyle = styles.checkboxIconStyle,
      innerIconStyle = styles.innerIconStyle,
      size = 24,
      fillColor = Colors.PRIMARY,
      textStyle = styles.textStyle,
      unFillColor,
      ...rest
    }: BouncyCheckboxProps,
    ref: any,
  ) => {
    return (
      <BouncyCheckbox
        ref={ref}
        {...rest}
        size={size}
        fillColor={fillColor}
        textStyle={textStyle}
        unFillColor={unFillColor}
        innerIconStyle={innerIconStyle}
        iconStyle={iconStyle}
      />
    );
  },
);

export default AppCheckBox;

const styles = StyleSheet.create({
  innerIconStyle: {borderWidth: 0},
  textStyle: {
    fontFamily: fontFamily.regular,
    textDecorationLine: 'none',
    fontSize: fontSize.normal,
    color: Colors.WHITE,
  },
  checkboxIconStyle: {
    borderColor: Colors.GARY_2,
    borderWidth: 1,
    borderRadius: 0,
    width: 24,
    height: 24,
  },
});
