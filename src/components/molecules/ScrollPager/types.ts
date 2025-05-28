import {ComponentType, ReactNode} from 'react';
import {TextStyle, ViewStyle} from 'react-native';

// --- Types ---
export interface TabItem {
  key?: string;
  title: string;
  render: (props: {index: number}) => ReactNode;
  icon?: () => ReactNode;
}

// Header component props
export interface HeaderProps {
  pageIndex: number;
}

// TabBar component props
export interface TabBarProps {
  tabs: TabItem[];
  activeIndex: number;
  onTabPress: (index: number) => void;
  icon: (focused: boolean) => JSX.Element;
}

export interface ScrollPagerProps {
  tabs: TabItem[];
  headerTitle?: string;
  HeaderComponent?: ComponentType<HeaderProps>;
  TabBarComponent?: ComponentType<TabBarProps>;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  tabBarStyle?: ViewStyle;
}
