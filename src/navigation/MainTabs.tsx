import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {AppTabBar} from '~/components';
import {HomeScreen} from '~/screens';
import {publicTabScreenOption} from '~/utils/utils';
import CommunityStack from './CommunityStack';
import CreateStack from './CreateStack';
import OffersStack from './OffersStack';
import ProfileStack from './ProfileStack';

export type MainTabParamList = {
  HomeTab: undefined;
  OffersTab: undefined;
  CreateTab: undefined;
  CommunityTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'HomeTab'}
      screenOptions={publicTabScreenOption}
      tabBar={(props: any) => <AppTabBar {...props} />}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="OffersTab" component={OffersStack} />
      <Tab.Screen name="CreateTab" component={CreateStack} />
      <Tab.Screen name="CommunityTab" component={CommunityStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
