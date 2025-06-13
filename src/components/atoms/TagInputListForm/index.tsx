import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useController, useFormContext} from 'react-hook-form';
import {
  AnimatedInput,
  AppHelperText,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

type TagInputListProps = {
  name: string;
  mandatory?: boolean;
  placeholder?: string;
};

const TagInputListForm = React.forwardRef<any, TagInputListProps>(
  ({name, mandatory, placeholder}, ref) => {
    const {control} = useFormContext();
    const {field, fieldState} = useController({
      name,
      control,
      defaultValue: '[]', // default is a JSON string
    });

    const [inputValue, setInputValue] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    // Decode the JSON string to array
    const tagList: string[] = (() => {
      try {
        return JSON.parse(field.value || '[]');
      } catch {
        return [];
      }
    })();

    const handleAddTag = () => {
      const newTag = inputValue.trim();
      const isValidTag = /^[\p{L} ]+$/u.test(newTag);

      if (!newTag) {
        setLocalError('Tag cannot be empty');
      } else if (!isValidTag) {
        setLocalError('Only letters and spaces are allowed');
      } else if (tagList.includes(newTag)) {
        setLocalError('Duplicate tag');
      } else {
        const updatedList = [...tagList, newTag];
        field.onChange(JSON.stringify(updatedList)); // save as JSON
        setInputValue('');
        setLocalError(null);
      }
    };

    const handleRemoveTag = (tagToRemove: string) => {
      const updatedList = tagList.filter(tag => tag !== tagToRemove);
      field.onChange(JSON.stringify(updatedList)); // save as JSON
    };

    return (
      <VStack space={4}>
        <AnimatedInput
          ref={ref}
          value={inputValue}
          onChangeText={text => {
            setInputValue(text);
            if (localError) setLocalError(null);
          }}
          placeholder={placeholder || 'Enter a tag'}
          borderColor={
            localError
              ? Colors.ERROR
              : fieldState.error
              ? Colors.ERROR
              : tagList.length
              ? Colors.INFO
              : Colors.GARY_3
          }
          mandatory={mandatory}
          onSubmitEditing={handleAddTag}
        />

        {localError ? (
          <AppHelperText error={{message: localError}} />
        ) : (
          <AppHelperText error={fieldState.error} />
        )}

        <HStack justifyContent="space-between" alignItems="flex-start" w="100%">
          <View style={styles.mainList}>
            {tagList.map((item: string, index: number) => (
              <AppTouchable
                key={`${item}-${index}`}
                onPress={() => handleRemoveTag(item)}
                style={styles.listTouchable}>
                <AppText>{item} ✕</AppText>
              </AppTouchable>
            ))}
          </View>

          <AppTouchable onPress={handleAddTag} style={styles.addMoreButton}>
            <AppText>+ Add more</AppText>
          </AppTouchable>
        </HStack>
      </VStack>
    );
  },
);

export default TagInputListForm;

const styles = StyleSheet.create({
  listTouchable: {
    backgroundColor: Colors.TRANSPARENT,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    paddingHorizontal: 10,
    borderRadius: scale(7),
  },
  mainList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
    flex: 3,
  },
  addMoreButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
});
