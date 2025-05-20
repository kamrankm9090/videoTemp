import React from 'react';
import {FieldError} from 'react-hook-form';
import {FlexStyle, StyleSheet} from 'react-native';
import {AnimatedView, AppText} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

type Props = {
  error?: FieldError;
  align?: FlexStyle['justifyContent'];
};

export default function AppHelperText({error, align}: Props) {
  return (
    <>
      {!!error?.message && (
        <AnimatedView style={[styles.rowCenter, {justifyContent: align}]}>
          <AppText
            flex={1}
            fontSize={fontSize.xTiny}
            fontFamily="regular"
            color={Colors.ERROR}>
            {error?.message}
          </AppText>
        </AnimatedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
});
