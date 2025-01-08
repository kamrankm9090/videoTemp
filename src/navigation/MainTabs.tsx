import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {AppTabBar} from '~/components';
import {publicTabScreenOption} from '~/utils/utils';
import HomeStack from './HomeStack';
import LiveStack from './LiveStack';

export type MainTabParamList = {
  HomeTab: undefined;
  LiveTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'HomeTab'}
      screenOptions={publicTabScreenOption}
      tabBar={(props: any) => <AppTabBar {...props} />}>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="LiveTab" component={LiveStack} />
    </Tab.Navigator>
  );
}
