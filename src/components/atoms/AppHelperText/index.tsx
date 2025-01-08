import React from 'react';
import {FieldError} from 'react-hook-form';
import {FlexStyle, StyleSheet} from 'react-native';
import {Info} from '~/assets/svgs';
import {AnimatedView, AppText, Spacer} from '~/components';
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
          <Info width={14} height={14} fill={Colors.ERROR} />
          <Spacer spaceX={2} />
          <AppText
            fontSize={fontSize.xxTiny}
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
    marginTop: 4,
    gap: 2,
  },
});
