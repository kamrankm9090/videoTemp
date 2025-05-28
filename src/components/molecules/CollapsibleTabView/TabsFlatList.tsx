import React, {ForwardedRef, MutableRefObject} from 'react';
import {
  Animated,
  FlatList,
  FlatListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface TabsFlatlistProps<ItemT = any> extends FlatListProps<ItemT> {
  onMomentumScrollBegin: () => void;
  onMomentumScrollEnd: () => void;
  paddingTop?: number;
  listRefArr: MutableRefObject<
    Array<{key: string; value: FlatList<ItemT> | null}>
  >;
  route: {key: string};
  focused: boolean;
  scrollY: Animated.Value;
  listPanResponder: {
    panHandlers: Record<string, unknown>;
  };
  canScroll: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const TabsFlatlist = React.forwardRef(
  <ItemT,>(
    {
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      contentContainerStyle,
      paddingTop,
      listRefArr,
      route,
      focused,
      scrollY,
      listPanResponder,
      canScroll,
      ...props
    }: TabsFlatlistProps<ItemT>,
    ref: ForwardedRef<FlatList<ItemT>>,
  ) => (
    <Animated.FlatList
      scrollEnabled={canScroll}
      ref={innerRef => {
        if (innerRef) {
          const found = listRefArr.current.find(e => e.key === route.key);
          if (!found) {
            listRefArr.current.push({
              key: route.key,
              value: innerRef,
            });
          }
        }
        if (typeof ref === 'function') {
          ref(innerRef);
        } else if (ref) {
          ref.current = innerRef;
        }
      }}
      scrollEventThrottle={16}
      onScroll={
        focused
          ? Animated.event(
              [
                {
                  nativeEvent: {contentOffset: {y: scrollY}},
                },
              ],
              {useNativeDriver: true},
            )
          : undefined
      }
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      style={{flex: 1}}
      contentContainerStyle={[
        contentContainerStyle, // Allow overriding content styles
        {paddingTop},
      ]}
      {...listPanResponder.panHandlers}
      {...props} // Spread all other props to FlatList
    />
  ),
);

export default TabsFlatlist;
