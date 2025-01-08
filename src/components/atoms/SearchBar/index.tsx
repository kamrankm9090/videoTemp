import {debounce} from 'lodash';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {SearchIcon} from '~/assets/svgs';
import {HStack} from '~/components';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceTime?: number;
  inputProps?: TextInputProps; // Optional additional props for TextInput
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  debounceTime = 300,
  inputProps,
}) => {
  const [query, setQuery] = useState<string>('');

  // Debounced function to pass the input to the parent component after a delay
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (onSearch) {
        onSearch(text);
      }
    }, debounceTime),
    [onSearch, debounceTime],
  );

  const handleChangeText = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <HStack space={scale(10)} style={styles.container}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleChangeText}
        autoCorrect={false}
        clearButtonMode="while-editing"
        {...inputProps} // Pass down additional props to TextInput
      />
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GARY_5,
    borderRadius: 100,
    padding: scale(10),
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
