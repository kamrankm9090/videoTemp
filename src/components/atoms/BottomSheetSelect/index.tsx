import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ArrowDown } from '~/assets/svgs';
import { AppText, AppTouchable } from '~/components';
import { Colors } from '~/styles';

export type OptionType = {
  label: string;
  value: string;
};

type Props = {
  options: OptionType[];
  onSelect: (item: OptionType) => void;
  selectedLabel?: string;
  placeholder?: string;
};

const BottomSheetSelect = ({
  options,
  onSelect,
  selectedLabel = '',
  placeholder = 'Select an option',
}: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSelect = useCallback(
    (item: OptionType) => {
      onSelect(item);
      bottomSheetRef.current?.dismiss();
    },
    [onSelect]
  );

  return (
    <>
      <AppTouchable onPress={openSheet} style={styles.dropdown}>
        <AppText fontSize={14} color={Colors.WHITE}>
          {selectedLabel || placeholder}
        </AppText>
        <ArrowDown />
      </AppTouchable>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={{ backgroundColor: Colors.BORDER }}
      >
        <BottomSheetView style={styles.sheetContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={({ pressed }) => [
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

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: Colors.WHITE_TRANSPARENT_1,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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

export default BottomSheetSelect;
