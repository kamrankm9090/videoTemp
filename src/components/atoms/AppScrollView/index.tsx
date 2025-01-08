import React, {forwardRef} from 'react';
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';

type Props = {
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  horizontal?: boolean;
  refreshing?: boolean;
  children?: ScrollViewProps['children'];
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  scrollEventThrottle?: ScrollViewProps['scrollEventThrottle'];
} & ScrollViewProps;

const AppScrollView = forwardRef<ScrollView, Props>((props, ref) => {
  const {
    contentContainerStyle,
    horizontal,
    children,
    refreshing = false,
    onRefresh,
    showsVerticalScrollIndicator = false,
    showsHorizontalScrollIndicator = false,
    scrollEventThrottle = 400,
    onEndReached,
    ...rest
  } = props;

  function isCloseToBottom({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  }

  return (
    <ScrollView
      ref={ref}
      horizontal={horizontal}
      scrollEventThrottle={scrollEventThrottle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      onScroll={({nativeEvent}: any) => {
        if (isCloseToBottom(nativeEvent)) {
          onEndReached?.();
        }
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={
        contentContainerStyle ?? {
          ...(!horizontal && styles.contentContainerStyle),
        }
      }
      {...rest}>
      {children}
    </ScrollView>
  );
});

export default AppScrollView;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
