import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {AppTabBar} from '~/components';
import {publicTabScreenOption, switchActions} from '~/utils/utils';
import CommunityStack from './CommunityStack';
import CreateStack from './CreateStack';
import HomeStack from './HomeStack';
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
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="OffersTab" component={OffersStack} />
      <Tab.Screen
        name="CreateTab"
        component={CreateStack}
        // listeners={({navigation}) => ({
        //   tabPress: e => {
        //     e.preventDefault();
        //     switchActions('create-action');
        //   },
        // })}
      />

      <Tab.Screen name="CommunityTab" component={CommunityStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
