import React, {
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  InteractionManager,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import CustomTabBar from '~/components/atoms/CustomTabView/CustomTabBar';
import Center from '~/components/common/Center';
import {Colors} from '~/styles';
import {height, scale} from '~/utils/style';
import TabsFlashList from './TabsFlashList';
import TabsFlatList from './TabsFlatList';

// Constants
const TAB_BAR_HEIGHT = scale(70);
const WINDOW_WIDTH = Dimensions.get('screen').width;
const INITIAL_HEADER_HEIGHT = 300;
const SCROLL_THRESHOLD = 5;
const VELOCITY_THRESHOLD = 0.2;

// Types
export interface TabRoute {
  key: string;
  title: string;
  icon?: () => ReactNode;
}

interface TabsProps {
  routes: TabRoute[];
  children: ReactElement[];
  renderHeader?: () => ReactElement;
  onTabChange?: (index: number) => void;
  initialTabIndex?: number;
}

interface ScrollMetrics {
  value: number;
  offset: number;
}

// Error boundary component
class TabsErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Something went wrong with the tabs.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// Optimized DefaultHeader component
const DefaultHeader = memo(() => (
  <View style={styles.headerContent}>
    <Text style={styles.headerText}>Default Header</Text>
  </View>
));

DefaultHeader.displayName = 'DefaultHeader';

// Utility functions
const createAnimatedValue = (initialValue: number): Animated.Value => {
  const value = new Animated.Value(initialValue);
  if (__DEV__) {
    value.addListener(() => {}); // Helps with debugging
  }
  return value;
};

const createPanResponders = (
  headerScrollY: Animated.Value,
  scrollY: Animated.Value,
  listRefArr: React.MutableRefObject<{key: string; value: any}[]>,
  headerScrollStart: React.MutableRefObject<number>,
  routes: TabRoute[],
  _tabIndex: React.MutableRefObject<number>,
  syncScrollOffset: () => void,
): {
  headerPanResponder: PanResponderInstance;
  listPanResponder: PanResponderInstance;
} => {
  const headerPanResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onStartShouldSetPanResponder: () => {
      headerScrollY.stopAnimation();
      syncScrollOffset();
      return false;
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      headerScrollY.stopAnimation();
      return Math.abs(gestureState.dy) > SCROLL_THRESHOLD;
    },
    onPanResponderRelease: (_, gestureState) => {
      syncScrollOffset();
      if (Math.abs(gestureState.vy) < VELOCITY_THRESHOLD) return;

      headerScrollY.setValue(scrollY._value);
      Animated.decay(headerScrollY, {
        velocity: -gestureState.vy,
        useNativeDriver: true,
      }).start(syncScrollOffset);
    },
    onPanResponderMove: (_, gestureState) => {
      listRefArr.current.forEach(ref => {
        if (ref?.value) {
          ref.value.scrollToOffset({
            offset: -gestureState.dy + headerScrollStart.current,
            animated: false,
          });
        }
      });
    },
    onShouldBlockNativeResponder: () => true,
    onPanResponderGrant: () => {
      headerScrollStart.current = scrollY._value;
    },
  });

  const listPanResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: () => {
      headerScrollY.stopAnimation();
      return false;
    },
    onShouldBlockNativeResponder: () => true,
    onPanResponderGrant: () => {
      headerScrollY.stopAnimation();
    },
  });

  return {headerPanResponder, listPanResponder};
};

// Main Tabs component
const Tabs: React.FC<TabsProps> = memo(
  ({routes, children, renderHeader, onTabChange, initialTabIndex = 0}) => {
    const [tabIndex, setIndex] = useState(initialTabIndex);
    const [headerHeight, setHeaderHeight] = useState(INITIAL_HEADER_HEIGHT);
    const [headerRendered, setHeaderRendered] = useState(false);
    const [canScroll, setCanScroll] = useState(true);

    const scrollY = useRef(createAnimatedValue(0)).current;
    const headerScrollY = useRef(createAnimatedValue(0)).current;
    const listRefArr = useRef<{key: string; value: any}[]>([]);
    const listOffset = useRef<Record<string, number>>({});
    const isListGliding = useRef(false);
    const headerScrollStart = useRef(0);
    const _tabIndex = useRef(initialTabIndex);

    // Optimized sync scroll offset
    const syncScrollOffset = useCallback(() => {
      const curRouteKey = routes[_tabIndex.current].key;
      const scrollValue = scrollY._value;

      // Update all tabs with the current scroll value
      listRefArr.current.forEach(item => {
        if (scrollValue < headerHeight && scrollValue >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollValue,
              animated: false,
            });
            listOffset.current[item.key] = scrollValue;
          }
        } else if (scrollValue >= headerHeight) {
          if (
            listOffset.current[item.key] < headerHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                animated: false,
              });
              listOffset.current[item.key] = headerHeight;
            }
          }
        }
      });
    }, [routes, headerHeight]);

    const {headerPanResponder, listPanResponder} = useMemo(
      () =>
        createPanResponders(
          headerScrollY,
          scrollY,
          listRefArr,
          headerScrollStart,
          routes,
          _tabIndex,
          syncScrollOffset,
        ),
      [headerScrollY, scrollY, routes, syncScrollOffset],
    );

    // Optimized scroll listeners
    useEffect(() => {
      const scrollListener = scrollY.addListener(({value}) => {
        // Update all tabs' offset when any tab is scrolled
        routes.forEach(route => {
          listOffset.current[route.key] = value;
        });
      });

      const headerScrollListener = headerScrollY.addListener(({value}) => {
        // Sync all tabs when header is scrolled
        listRefArr.current.forEach(ref => {
          if (ref?.value && value <= headerHeight) {
            ref.value.scrollToOffset({
              offset: value,
              animated: false,
            });
            listOffset.current[ref.key] = value;
          }
        });

        if (value > headerHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
      });

      return () => {
        scrollY.removeListener(scrollListener);
        headerScrollY.removeListener(headerScrollListener);
      };
    }, [routes, headerHeight, syncScrollOffset]);

    useEffect(() => {
      const currentRef = listRefArr.current.find(
        item => item.key === routes[tabIndex].key,
      );

      if (
        currentRef?.value &&
        listOffset.current[routes[tabIndex].key] !== undefined
      ) {
        currentRef.value.scrollToOffset({
          offset: listOffset.current[routes[tabIndex].key],
          animated: false,
        });
      }
    }, [tabIndex, routes]);

    // Optimized scroll handlers
    const onMomentumScrollBegin = useCallback(() => {
      isListGliding.current = true;
    }, []);

    const onMomentumScrollEnd = useCallback(() => {
      isListGliding.current = false;
      syncScrollOffset();
    }, [syncScrollOffset]);

    const onScrollEndDrag = useCallback(() => {
      syncScrollOffset();
    }, [syncScrollOffset]);

    // Memoized animations
    const headerTranslateY = useMemo(
      () =>
        scrollY.interpolate({
          inputRange: [0, headerHeight],
          outputRange: [0, -headerHeight],
          extrapolate: 'clamp',
        }),
      [scrollY, headerHeight],
    );

    const tabBarTranslateY = useMemo(
      () =>
        scrollY.interpolate({
          inputRange: [0, headerHeight],
          outputRange: [headerHeight, 0],
          extrapolate: 'clamp',
        }),
      [scrollY, headerHeight],
    );

    // Optimized render functions
    const renderHeaderLocal = useCallback(
      () => (
        <Animated.View
          {...headerPanResponder.panHandlers}
          style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}
          onLayout={e => {
            const newHeight = e.nativeEvent.layout.height;
            if (newHeight !== headerHeight) {
              InteractionManager.runAfterInteractions(() => {
                setHeaderHeight(newHeight);
                setHeaderRendered(true);
              });
            }
          }}>
          {renderHeader ? renderHeader() : <DefaultHeader />}
        </Animated.View>
      ),
      [headerPanResponder, headerTranslateY, headerHeight, renderHeader],
    );

    const renderScene = useCallback(
      ({route}: SceneRendererProps & {route: TabRoute}) => {
        if (!headerRendered) {
          return (
            <Center py={height / 1.5}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </Center>
          );
        }

        const sceneContent = children.find(child => child.key === route.key);
        if (!sceneContent) return null;

        return React.cloneElement(sceneContent, {
          onMomentumScrollEnd,
          onMomentumScrollBegin,
          onScrollEndDrag,
          listRefArr,
          route,
          focused: route.key === routes[tabIndex].key,
          scrollY,
          paddingTop: headerHeight + TAB_BAR_HEIGHT,
          canScroll,
          listPanResponder,
        });
      },
      [
        headerRendered,
        children,
        onMomentumScrollEnd,
        onMomentumScrollBegin,
        onScrollEndDrag,
        routes,
        tabIndex,
        headerHeight,
        canScroll,
      ],
    );

    const renderTabBar = useCallback(
      props => (
        <Animated.View
          style={[
            styles.tabBarContainer,
            {transform: [{translateY: tabBarTranslateY}]},
          ]}>
          <CustomTabBar
            mainStyle={styles.tabBarMain}
            {...props}
            setIndex={(index: number) => {
              setIndex(index);
              onTabChange?.(index);
            }}
          />
        </Animated.View>
      ),
      [tabBarTranslateY, routes, onTabChange],
    );

    // Layout effect for initial setup
    useLayoutEffect(() => {
      InteractionManager.runAfterInteractions(() => {
        _tabIndex.current = initialTabIndex;
      });
    }, [initialTabIndex]);

    return (
      <TabsErrorBoundary>
        <View style={styles.container}>
          <TabView
            onSwipeStart={() => setCanScroll(false)}
            onSwipeEnd={() => setCanScroll(true)}
            onIndexChange={id => {
              _tabIndex.current = id;
              setIndex(id);

              // Sync scroll position for the new tab
              const newTabRef = listRefArr.current.find(
                item => item.key === routes[id].key,
              );

              if (newTabRef?.value) {
                const offset = Math.max(
                  0,
                  Math.min(scrollY._value, headerHeight),
                );
                newTabRef.value.scrollToOffset({
                  offset,
                  animated: false,
                });
                listOffset.current[routes[id].key] = offset;
              }
            }}
            navigationState={{index: tabIndex, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            lazy
            initialLayout={{height: 0, width: WINDOW_WIDTH}}
          />
          {renderHeaderLocal()}
        </View>
      </TabsErrorBoundary>
    );
  },
);

Tabs.displayName = 'Tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: Colors.BACKGROUND,
    // ...Platform.select({
    //   ios: {
    //     zIndex: 1,
    //     shadowColor: Colors.GARY_5,
    //     shadowOffset: {width: 0, height: 2},
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //   },
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  tabBarContainer: {
    top: 0,
    zIndex: 1000,
    position: 'absolute',
    width: WINDOW_WIDTH,
    backgroundColor: Colors.BACKGROUND,
    // ...Platform.select({
    //   ios: {
    //     zIndex: 1,
    //     shadowColor: '#000',
    //     shadowOffset: {width: 0, height: 1},
    //     shadowOpacity: 0.22,
    //     shadowRadius: 2.22,
    //   },
    //   android: {
    //     elevation: 3,
    //   },
    // }),
  },
  tabBarMain: {
    marginVertical: scale(10),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  errorText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    textAlign: 'center',
  },
});

export {TAB_BAR_HEIGHT, Tabs, TabsFlashList, TabsFlatList};
