import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';
import {ScrollPagerProps, TabBarProps} from './types';
import HStack from '~/components/common/HStack';
import {scale} from '~/utils/style';

// Dimensions
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// --- Reusable Header Component ---
export const Header: React.FC<{
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}> = memo(({title, style, textStyle}) => (
  <View style={[styles.header, style]}>
    <Text style={[styles.headerTitle, textStyle]}>{title}</Text>
  </View>
));

// --- Reusable TabBar Component ---
export const TabBar: React.FC<TabBarProps> = memo(
  ({tabs, activeIndex, onTabPress, containerStyle}) => {
    const indicatorX = useRef(new Animated.Value(0)).current;
    const tabWidth = SCREEN_WIDTH / tabs.length;

    useEffect(() => {
      Animated.spring(indicatorX, {
        toValue: activeIndex * tabWidth,
        useNativeDriver: true,
      }).start();
    }, [activeIndex, indicatorX, tabWidth]);

    return (
      <View style={[styles.tabBar, containerStyle]}>
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: tabWidth,
              transform: [{translateX: indicatorX}],
            },
          ]}
        />

        {tabs.map((tab, idx) => {
          const focused = idx === activeIndex;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => onTabPress(idx)}>
              <HStack alignItems="center" space={scale(5)}>
                {tab.icon && tab?.icon?.(focused)}
                <Text style={[styles.tabText, focused && styles.tabTextActive]}>
                  {tab.title}
                </Text>
              </HStack>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

// --- Reusable Page Component ---
export const Page: React.FC = memo(({children}) => (
  <View style={styles.pageContent}>{children}</View>
));

// --- Main ScrollPager Component ---
const ScrollPager: React.FC<ScrollPagerProps> = ({
  tabs,
  headerTitle = '',
  HeaderComponent,
  TabBarComponent,
  containerStyle,
  headerStyle,
  headerTextStyle,
  tabBarStyle,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleTabPress = (idx: number) => {
    setPageIndex(idx);
    scrollRef.current?.scrollTo({x: idx * SCREEN_WIDTH, animated: true});
  };

  const renderHeader = () =>
    HeaderComponent ? (
      <HeaderComponent pageIndex={pageIndex} />
    ) : (
      <Header
        title={headerTitle}
        style={headerStyle}
        textStyle={headerTextStyle}
      />
    );

  const renderTabBar = () =>
    TabBarComponent ? (
      <TabBarComponent
        tabs={tabs}
        activeIndex={pageIndex}
        onTabPress={handleTabPress}
      />
    ) : (
      <TabBar
        tabs={tabs}
        activeIndex={pageIndex}
        onTabPress={handleTabPress}
        style={tabBarStyle}
      />
    );

  return (
    <ScrollView
      style={[styles.container, containerStyle]}
      stickyHeaderIndices={[0, 1]}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {renderTabBar()}
      <ScrollView
        horizontal
        pagingEnabled
        nestedScrollEnabled
        ref={scrollRef}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setPageIndex(idx);
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {tabs.map((tab, idx) => (
          <View key={tab.key ?? idx} style={{width: SCREEN_WIDTH}}>
            {tab.render({index: idx})}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default ScrollPager;
