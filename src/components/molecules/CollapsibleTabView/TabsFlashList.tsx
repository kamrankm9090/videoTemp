import React, {ForwardedRef, MutableRefObject} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {FlashList, FlashListProps} from '@shopify/flash-list';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

interface TabsFlashlistProps<ItemT = any> extends FlashListProps<ItemT> {
  onMomentumScrollBegin: () => void;
  onMomentumScrollEnd: () => void;
  paddingTop?: number;
  listRefArr: MutableRefObject<
    Array<{key: string; value: FlashList<ItemT> | null}>
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

const TabsFlashlist = React.forwardRef(
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
    }: TabsFlashlistProps<ItemT>,
    ref: ForwardedRef<FlashList<ItemT>>,
  ) => (
    <AnimatedFlashList
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
          (ref as MutableRefObject<FlashList<ItemT> | null>).current = innerRef;
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
      contentContainerStyle={{paddingTop}}
      {...listPanResponder.panHandlers}
      {...props} // Pass all other FlashList props
    />
  ),
);

export default TabsFlashlist;
