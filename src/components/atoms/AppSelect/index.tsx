import React, {ReactNode} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ArrowDown} from '~/assets/svgs';
import {AppHelperText, AppText, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';

type Props = React.ComponentProps<typeof View> & {
  name: string;
  label?: string;
  onPress?: () => void;
  titleKey?: string;
  endComponent?: JSX.Element;
  children?: ReactNode;
  numberOfLines?: number;
  alignItems?: 'center' | 'flex-end' | 'flex-start';
  disabled?: boolean;
  mb?: ViewStyle['marginBottom'];
  backgroundColor?: ViewStyle['backgroundColor'];
  mandatory?: any;
};

const AppSelect = React.forwardRef(
  ({
    name,
    label,
    onPress,
    titleKey = 'name',
    endComponent,
    children,
    numberOfLines,
    alignItems = 'center',
    disabled,
    mb,
    backgroundColor,
    mandatory,
  }: Props) => {
    const {control} = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({field: {value}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.container,
                !!error && !value && {borderColor: Colors.ERROR},
                {marginBottom: mb},
              ]}>
              {value && (
                <HStack style={{...styles.label, backgroundColor}}>
                  <AppText
                    fontSize={10}
                    color={error ? Colors.ERROR : Colors.WHITE}>
                    {label ? label + ' ' : ''}
                  </AppText>
                  {mandatory && (
                    <AppText fontFamily="bold" color={Colors.PRIMARY}>
                      {' *'}
                    </AppText>
                  )}
                </HStack>
              )}
              <AppTouchable
                h={48}
                px={16}
                w="100%"
                rounded={8}
                alignItems={alignItems}
                flexDirection="row"
                onPress={onPress}
                disabled={disabled}>
                <View style={styles.textWrapper}>
                  <AppText
                    numberOfLines={numberOfLines}
                    {...(!value && {
                      color: error ? Colors.ERROR : Colors.Grey,
                    })}>
                    {value
                      ? titleKey
                        ? value?.[titleKey]
                        : value
                      : `${label || ''}`}
                  </AppText>
                </View>
                {endComponent ? endComponent : <ArrowDown />}
              </AppTouchable>
              {children}
            </View>
            {!value && <AppHelperText error={error} />}
          </>
        )}
      />
    );
  },
);

AppSelect.displayName = 'CustomSelect';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Colors.Mortar,
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
  },
  label: {
    left: 10,
    position: 'absolute',
    zIndex: 9999,
    top: -9,
    paddingHorizontal: 8,
  },
  textWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});

export default AppSelect;
