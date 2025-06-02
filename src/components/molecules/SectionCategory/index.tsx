import React, {useMemo, useState} from 'react';
import {useController} from 'react-hook-form';
import {AppDropDown} from '~/components';
import {useInfiniteCategory_GetCategoriesQuery} from '~/graphql/generated';

const SectionCategory = React.forwardRef(
  ({
    name,
    label = 'Category',
    disabled,
    onChange,
    mandatory,
  }: {
    name: string;
    label?: string | null;
    disabled?: boolean;
    onChange?: (item: any) => void;
    mandatory?: boolean;
  }) => {
    const {field: stateField} = useController({name: 'state'});
    const [searchText, setSearchText] = useState<string>('');

    const {
      data: getCategories,
      isLoading: isLoadingGetCategories,
      hasNextPage,
      fetchNextPage,
    } = useInfiniteCategory_GetCategoriesQuery({
      where: {title: {contains: searchText}},
    });

    const categories = useMemo(() => {
      return getCategories?.pages
        ?.map(a => a?.category_getCategories?.result?.items)
        .flat();
    }, [getCategories]);

    function onSubmitSearch(text: string) {
      if (text && text?.length > 0) {
        setSearchText(text);
      } else {
        setSearchText('');
      }
    }

    function onChangeCountry(item: any) {
      stateField.onChange(undefined);
      onChange?.(item);
    }

    function onLoadMore() {
      if (hasNextPage) {
        fetchNextPage();
      }
    }

    return (
      <AppDropDown
        data={categories || []}
        name={name}
        label={label}
        loading={isLoadingGetCategories}
        placeholder="Select"
        titleKey="title"
        valueKey="id"
        onSubmitSearch={onSubmitSearch}
        disabled={disabled}
        onChange={onChangeCountry}
        onLoadMore={onLoadMore}
        mandatory={mandatory}
      />
    );
  },
);

SectionCategory.displayName = 'SectionCategory';

export default SectionCategory;
