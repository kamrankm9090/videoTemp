import React from 'react';
import {useFormContext} from 'react-hook-form';
import {ViewStyle} from 'react-native';
import {AppContainer, AppSelect} from '~/components';
import {Colors} from '~/styles';
import {hideSheet, showSheet} from '~/utils/utils';

type Props = {
  name: string;
  data: any;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  titleKey?: string;
  nestedTitleKey?: string;
  valueKey?: string;
  onSubmitSearch?: (val: string) => void;
  onChange?: (val: any) => void;
  disabled?: boolean;
  isObject?: boolean;
  optional?: boolean;
  searchable?: boolean;
  onLoadMore?: () => void;
  mb?: ViewStyle['marginBottom'];
  backgroundColor?: ViewStyle['backgroundColor'];
  mandatory?: boolean;
};

const AppDropDown = React.forwardRef(
  ({
    name,
    data,
    label,
    loading,
    titleKey = 'title',
    nestedTitleKey,
    valueKey = 'value',
    onSubmitSearch = () => {},
    onChange,
    disabled,
    isObject = true,
    searchable = true,
    onLoadMore,
    mb,
    backgroundColor,
    mandatory,
  }: Props) => {
    const {control} = useFormContext();

    function onPressHandler() {
      showSheet('drop-down-action-sheet', {
        payload: {
          name,
          control,
          data,
          label,
          loading,
          titleKey,
          nestedTitleKey,
          valueKey,
          onSubmitSearch,
          onChange,
          disabled,
          isObject,
          searchable,
          onLoadMore,
          mb,
          backgroundColor,
        },
      });
    }

    function closeModal() {
      hideSheet('drop-down-action-sheet');
    }

    return (
      <AppContainer
        backgroundColor={
          (backgroundColor as string) || (Colors.BACKGROUND as string)
        }>
        <AppSelect
          name={name}
          label={label}
          mandatory={mandatory}
          onPress={onPressHandler}
          titleKey={titleKey}
          disabled={disabled}
          mb={mb}
          backgroundColor={backgroundColor}
        />
      </AppContainer>
    );
  },
);

AppDropDown.displayName = 'AppDropDown';

export default AppDropDown;
