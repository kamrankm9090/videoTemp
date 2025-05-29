import debounce from 'lodash.debounce';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, ViewStyle} from 'react-native';
import {Close, Search} from '~/assets/svgs';
import {AppInput, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

interface Props extends TextInputProps {
  onChange?: any;
  onClear?: () => void;
  placeholder?: TextInputProps['placeholder'];
  flex?: ViewStyle['flex'];
  width?: ViewStyle['width'];
  backgroundColor?: string;
  height?: ViewStyle['height'];
  placeholderTextColor?: string;
  color?: string;
  iconColor?: string;
  numberOfLines?: number;
  useDebounce?: boolean;
  mx?: ViewStyle['marginHorizontal'];
  mb?: ViewStyle['marginBottom'];
  defaultValue?: any;
}

export default function SearchInput(props: Props) {
  const {
    onChange,
    onClear,
    placeholder = 'Search',
    flex,
    width,
    backgroundColor,
    height = 48,
    placeholderTextColor = Colors.Grey,
    color = Colors.Grey,
    numberOfLines = 1,
    useDebounce = true,
    mx,
    mb,
    defaultValue,
    ...restProps
  } = props;

  const [userQuery, setUserQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const updateQueryRef = useRef<(text: string) => void>(() => {});

  useEffect(() => {
    updateQueryRef.current = debounce(onChange, 500);
  }, [onChange]);

  const onChangeText = useCallback(
    (text: string) => {
      setUserQuery(text);
      if (useDebounce) {
        updateQueryRef.current(text?.toLowerCase());
      } else {
        onChange?.(text);
      }
    },
    [setUserQuery],
  );

  useEffect(() => {
    if (defaultValue && defaultValue?.length > 0) {
      setUserQuery(defaultValue);
    }
  }, [defaultValue]);

  function clearOnPress() {
    setUserQuery('');
    onChange?.('');
    onClear?.();
  }

  return (
    <HStack
      mx={mx}
      mb={mb}
      px={16}
      w={width}
      space={8}
      h={height}
      flex={flex}
      rounded={8}
      borderWidth={1}
      bg={backgroundColor}
      borderColor={Colors.Grey}>
      <Search stroke={Colors.Grey} />
      <AppInput
        ref={inputRef}
        autoCapitalize="sentences"
        value={userQuery}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, {color}]}
        {...restProps}
      />
      {userQuery?.length > 0 && (
        <AppTouchable onPress={clearOnPress}>
          <Close />
        </AppTouchable>
      )}
    </HStack>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.normal,
    height: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    width: '100%',
  },
});
