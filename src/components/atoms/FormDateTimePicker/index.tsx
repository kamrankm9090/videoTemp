import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import {CalenderIcon, Clock} from '~/assets/svgs';
import {AppHelperText, AppText, AppTouchable, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {appFormatDate} from '~/utils/utils';

interface Props {
  name: string;
  label?: string;
  textColor?: TextStyle['color'];
  mode?: DateTimePickerProps['mode'];
  mb?: ViewStyle['marginBottom'];
  flex?: ViewStyle['flex'];
}

export default React.forwardRef(
  ({name, label, textColor = Colors.WHITE, mode = 'date', mb, flex}: Props) => {
    const {field, fieldState} = useController({name});
    const [visible, setVisible] = useState<boolean>(false);

    function onPressHandler() {
      setVisible(true);
    }

    function onConfirm(inputDate: Date) {
      setVisible(false);
      field.onChange(inputDate);
    }

    return (
      <VStack flex={flex}>
        <View
          style={[
            styles.container,
            !!fieldState.error && !field.value && {borderColor: Colors.ERROR},
            {marginBottom: mb},
          ]}>
          {field.value && (
            <View style={styles.label}>
              <AppText
                fontSize={fontSize.xxTiny}
                color={fieldState.error ? Colors.ERROR : Colors.WHITE}>
                {label ? label + ' ' : ''}
              </AppText>
            </View>
          )}
          <AppTouchable
            px={4}
            h="100%"
            flexDirection="row"
            alignItems="center"
            onPress={onPressHandler}
            justifyContent="space-between">
            <AppText
              numberOfLines={1}
              color={textColor}
              fontSize={fontSize.tiny}>
              {field?.value
                ? appFormatDate(
                    field?.value,
                    mode === 'date'
                      ? 'YYYY/M/DD'
                      : mode === 'datetime'
                      ? 'M/DD/YYYY-h:m A'
                      : 'h:mm A',
                  )
                : label}
            </AppText>
            {mode === 'time' ? <Clock /> : <CalenderIcon />}
          </AppTouchable>
        </View>
        <AppHelperText error={fieldState.error} />
        <DateTimePickerModal
          isVisible={visible}
          mode={mode}
          onConfirm={onConfirm}
          onCancel={() => setVisible(false)}
        />
      </VStack>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.Mortar,
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
    height: 48,
    paddingHorizontal: 8,
  },
  label: {
    left: 10,
    position: 'absolute',
    zIndex: 9999,
    top: -7,
    paddingHorizontal: 8,
    backgroundColor: Colors.BACKGROUND,
  },
});
