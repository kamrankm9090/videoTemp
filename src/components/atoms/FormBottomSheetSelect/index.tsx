import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {useController, useFormContext} from 'react-hook-form';
import {ArrowDown} from '~/assets/svgs';
import {AppText, AppTouchable, AppHelperText} from '~/components';
import {Colors} from '~/styles';

export type OptionType = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: OptionType[];
  placeholder?: string;
};

const FormBottomSheetSelect = ({name, options, placeholder = 'Select'}: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const [search, setSearch] = useState('');

  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({name});
  const {setValue} = useFormContext();

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleSelect = useCallback(
    (item: OptionType) => {
      onChange(item.value);
      closeSheet();
    },
    [onChange, closeSheet]
  );

  const selectedLabel = useMemo(() => {
    return options.find(o => o.value === value)?.label;
  }, [value, options]);

  const filteredOptions = useMemo(() => {
    const text = search.trim().toLowerCase();
    return options.filter(opt =>
      opt.label.toLowerCase().includes(text)
    );
  }, [search, options]);

  return (
    <>
      <AppTouchable
        onPress={openSheet}
        style={[
          styles.dropdown,
          {borderColor: error ? Colors.ERROR : Colors.WHITE_TRANSPARENT_2},
        ]}
      >
        <AppText
          fontSize={14}
          color={selectedLabel ? Colors.WHITE : Colors.PLACEHOLDER}
        >
          {selectedLabel || placeholder}
        </AppText>
        <ArrowDown />
      </AppTouchable>
      <AppHelperText error={error} />

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={{backgroundColor: Colors.BORDER}}
      >
        <BottomSheetView style={styles.sheetContainer}>
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.PLACEHOLDER}
            style={styles.searchInput}
          />
          <FlatList
            data={filteredOptions}
            keyExtractor={item => item.value}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={({pressed}) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
              >
                <AppText fontSize={14}>{item.label}</AppText>
              </Pressable>
            )}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default FormBottomSheetSelect;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sheetBackground: {
    backgroundColor: Colors.SEMI_BLACK,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchInput: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: Colors.WHITE,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  optionPressed: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.BORDER,
    marginVertical: 4,
  },
});
