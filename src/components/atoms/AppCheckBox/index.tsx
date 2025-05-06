import React from 'react';
import {StyleSheet} from 'react-native';
import BouncyCheckbox, {
  BouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {AppText, VStack} from '~/components';

type CheckBoxProps = {description?: string} & BouncyCheckboxProps;

const AppCheckBox = React.forwardRef(
  (
    {
      iconStyle = styles.checkboxIconStyle,
      innerIconStyle = styles.innerIconStyle,
      size = 24,
      fillColor = Colors.PRIMARY,
      textStyle = styles.textStyle,
      unFillColor,
      description,
      ...rest
    }: CheckBoxProps,
    ref: any,
  ) => {
    return (
      <VStack space={12}>
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
        {description && (
          <AppText
            lineHeight={22}
            fontSize={fontSize.small}
            color={Colors.Grey}>
            {description}
          </AppText>
        )}
      </VStack>
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
