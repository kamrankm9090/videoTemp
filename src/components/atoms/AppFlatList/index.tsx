import React, {forwardRef, useCallback, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  AnimationProvider,
  AppIndicator,
  Box,
  Fab,
  NoData,
  Center,
  Divider,
} from '~/components';

interface CustomProps<T> {
  data: T[];
  listHeaderComponent?: FlatListProps<T>['ListHeaderComponent'];
  listEmptyComponent?: FlatListProps<T>['ListEmptyComponent'];
  onEndReached?: () => void;
  refreshing?: boolean;
  isLoading?: boolean;
  contentContainerStyle?: FlatListProps<T>['contentContainerStyle'];
  itemSeparatorComponent?: FlatListProps<T>['ItemSeparatorComponent'];
  listFooterComponent?: FlatListProps<T>['ListFooterComponent'];
  keyExtractor?: (item: T, index: number) => string;
  isFetchingNextPage?: boolean;
  inverted?: boolean;
  horizontal?: boolean;
  keyValue?: string;
  hasItemSeparatorComponent?: boolean;
  hasListEmptyComponent?: boolean;
  LoadingComponent?: JSX.Element;
  hasInternalLoading?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  showScrollToTop?: boolean;
  spaceX?: ViewStyle['width'];
  spaceY?: ViewStyle['height'];
  separatorType?: 'spacer' | 'divider';
  emptyText?: string;
  emptyDescription?: string;
  emptyIcon?: JSX.Element;
  showEmptyIcon?: boolean;
  showEmptyText?: boolean;
  showEmptyDescription?: boolean;
}

type Props<T> = FlatListProps<T> & CustomProps<T>;

const AppFlatList = forwardRef<FlatList<any>, Props<any>>((props, ref) => {
  const {
    data,
    listHeaderComponent,
    listEmptyComponent,
    onEndReached,
    refreshing = false,
    isLoading,
    isFetchingNextPage,
    contentContainerStyle,
    itemSeparatorComponent,
    listFooterComponent,
    keyExtractor,
    inverted,
    horizontal,
    keyValue,
    hasItemSeparatorComponent = true,
    hasListEmptyComponent = true,
    LoadingComponent = (
      <Center flex={1}>
        <AppIndicator size="large" />
      </Center>
    ),
    hasInternalLoading = false,
    onScroll,
    showScrollToTop,
    spaceX = 8,
    spaceY = 16,
    separatorType = 'spacer',
    emptyText,
    emptyDescription,
    emptyIcon,
    showEmptyIcon,
    showEmptyText,
    showEmptyDescription,
    ...rest
  } = props;

  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const itemSeparator = useCallback(() => {
    if (hasItemSeparatorComponent) {
      return separatorType === 'divider' ? (
        <Divider mx={spaceX} my={spaceY} />
      ) : (
        <Box h={horizontal ? 0 : spaceY} w={horizontal ? spaceX : 0} />
      );
    } else {
      return;
    }
  }, [horizontal, hasItemSeparatorComponent, spaceX, spaceY, separatorType]);

  const footerComponent = useCallback(() => {
    return (
      <Center
        flex={1}
        h={horizontal ? undefined : 55}
        w={horizontal ? 55 : undefined}>
        <AppIndicator size="large" />
      </Center>
    );
  }, [horizontal]);

  const renderEmptyComponent = useCallback(() => {
    return (
      <NoData
        showText={showEmptyText}
        showDescription={showEmptyDescription}
        showIcon={showEmptyIcon}
        text={emptyText}
        description={emptyDescription}
        customIcon={emptyIcon}
      />
    );
  }, [
    emptyText,
    emptyDescription,
    emptyIcon,
    showEmptyIcon,
    showEmptyText,
    showEmptyDescription,
  ]);

  const internalKeyExtractor = useCallback(
    (item: any, index: number) =>
      `flatListItm${item?.[keyValue ?? 'id'] ?? index}`,
    [keyValue],
  );

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Adjust the threshold value as needed
    const threshold = 200; // You can adjust this threshold
    setShowScrollButton(offsetY > threshold);
  }

  function scrollToTop() {
    if (ref?.current) {
      ref.current?.scrollToOffset({offset: 0, animated: true});
    }
  }

  return (
    <>
      <FlatList
        horizontal={horizontal}
        ref={ref}
        onScroll={showScrollToTop ? handleScroll : onScroll}
        inverted={inverted}
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          contentContainerStyle ?? {
            ...(!horizontal && styles.contentContainerStyle),
          }
        }
        keyExtractor={keyExtractor ?? internalKeyExtractor}
        refreshing={refreshing}
        ListEmptyComponent={
          !isLoading && hasListEmptyComponent
            ? listEmptyComponent
              ? listEmptyComponent
              : renderEmptyComponent
            : hasInternalLoading
            ? LoadingComponent
            : undefined
        }
        ListFooterComponent={
          listFooterComponent
            ? listFooterComponent
            : isFetchingNextPage
            ? footerComponent
            : undefined
        }
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={itemSeparatorComponent ?? itemSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) {
            return;
          }
          onEndReached?.();
        }}
        {...rest}
      />
      {showScrollButton && <AnimationProvider
        visible={showScrollButton}
        visibleChildren={
          <Fab
            left={24}
            onPress={scrollToTop}
            name={inverted ? 'arrow-down' : 'arrow-up'}
          />
        }
        inVisibleChildren={null}
      />}
    </>
  );
});

export default AppFlatList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
