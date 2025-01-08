import React, {memo} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {NavigationState} from 'react-native-tab-view';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import AppText from '../AppText';
import AppTouchable from '../AppTouchable';

// Define types for navigation state and other props
interface TabRoute {
  key: string;
  title: string;
}

interface CustomTabBarProps {
  navigationState: NavigationState<TabRoute>;
  position: Animated.Value; // Plain Animated Value
  setIndex: (index: number) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  navigationState,
  position,
  setIndex,
}: CustomTabBarProps) => {
  // Default value for routes in case navigationState is undefined or doesn't have routes
  const routes = navigationState?.routes || [];

  return (
    <View style={styles.tabBar}>
      {routes.length > 0 &&
        routes.map((route, i) => {
          const isFocused = navigationState.index === i;

          const color = isFocused ? Colors.ButtonSecondary : Colors.TRANSPARENT;

          return (
            <AppTouchable
              onPress={() => setIndex(i)}
              key={route.key}
              style={[styles.tabItem, {backgroundColor: color}]}>
              <AppText color={Colors.BLACK} textAlign="center">
                {route.title}
              </AppText>
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
    backgroundColor: Colors.GRAY_6,
    marginHorizontal: scale(15),
    paddingHorizontal: scale(8),
    borderRadius: 1000,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    height: '70%',
  },
});
