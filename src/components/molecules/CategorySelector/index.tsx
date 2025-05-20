import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AppFlatList from '~/components/atoms/AppFlatList';
import AppText from '~/components/atoms/AppText';
import AppTouchable from '~/components/atoms/AppTouchable';
import {useInfiniteCategory_GetCategoriesQuery} from '~/graphql/generated';
import {Colors} from '~/styles';

const CategorySelector = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (category: string) => void;
}) => {
  const {
    data: getCategories,
    isLoading: isLoadingGetCategories,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteCategory_GetCategoriesQuery({});

  const categories = useMemo(() => {
    const data = getCategories?.pages
      ?.map(a => a?.category_getCategories?.result?.items)
      .flat();
    return data ? ['All', ...data?.map(i => i?.title)] : [];
  }, [getCategories]);

  useEffect(() => {
    setSelected(categories?.[0] ?? '');
  }, [categories]);

  return (
    <AppFlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={item => `key ${item}`}
      renderItem={({item}: any) => {
        const isActive = item === selected;
        const bgColor = isActive ? Colors.PRIMARY : Colors.NIGHT_RIDER;
        const textColor = isActive ? Colors.WHITE : Colors.GARY_3;
        return (
          <AppTouchable
            onPress={() => setSelected(item)}
            bg={bgColor}
            px={10}
            py={5}
            rounded={8}>
            <AppText
              fontWeight="500"
              color={textColor}
              lineHeight={24}
              fontSize={14}>
              {item}
            </AppText>
          </AppTouchable>
        );
      }}
    />
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  
});
