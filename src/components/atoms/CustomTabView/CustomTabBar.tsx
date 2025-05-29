import React, {memo, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {NavigationState} from 'react-native-tab-view';
import {Colors} from '~/styles';
import {scale, width as SCREEN_WIDTH} from '~/utils/style';
import AppText from '../AppText';
import AppTouchable from '../AppTouchable';
import HStack from '~/components/common/HStack';

const TAB_BAR_WIDTH = SCREEN_WIDTH * 0.9;

interface TabRoute {
  key: string;
  title: string;
  icon?: (focused: boolean) => React.ReactNode;
}

interface CustomTabBarProps {
  navigationState: NavigationState<TabRoute>;
  position: Animated.Value;
  setIndex: (index: number) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  navigationState,
  position,
  setIndex,
}) => {
  const {routes, index: activeIndex} = navigationState;
  const tabWidth = TAB_BAR_WIDTH / routes.length;
  const indicatorX = useRef(new Animated.Value(activeIndex * tabWidth)).current;

  useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, tabWidth]);

  return (
    <View style={[styles.tabBar, {width: TAB_BAR_WIDTH}]}>
      <Animated.View
        style={[
          styles.activeBackground,
          {
            width: tabWidth,
            transform: [{translateX: indicatorX}],
          },
        ]}
      />

      {routes.map((route, i) => {
        const isFocused = activeIndex === i;

        return (
          <AppTouchable
            onPress={() => setIndex(i)}
            key={route.key}
            style={styles.tabItem}>
            <HStack alignItems="center" space={scale(5)}>
              {route?.icon?.(isFocused)}
              <AppText color={Colors.WHITE} textAlign="center">
                {route.title}
              </AppText>
            </HStack>
          </AppTouchable>
        );
      })}
    </View>
  );
};

export default memo(CustomTabBar);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: scale(50),
    backgroundColor: Colors.Nero_3,
    marginHorizontal: scale(15),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    zIndex: 1,
  },
  activeBackground: {
    position: 'absolute',
    height: '80%',
    top: '10%',
    backgroundColor: Colors.NIGHT_RIDER,
    borderRadius: scale(8),

    left: 0,
  },
});
