import React from 'react';
import {
  AnalyticsScreen,
  BlockedUsersScreen,
  DeleteAccountScreen,
  EditProfileScreen,
  FollowerFollowingScreen,
  ForgotPasswordScreen,
  PasswordSettingScreen,
  ProfileScreen,
  ResumeScreen,
  SavedScreen,
  SettingsActivityScreen,
  SupportScreen,
  TotalIncomeScreen,
  WalletScreen,
} from '~/screens';
import {publicScreenOption} from '~/utils/utils';
import {appCreateStackNavigator} from './methods';

export type ProfileStackParamList = {
  Profile: {
    userId?: number;
  };
  FollowerFollowing: {type: 'follower' | 'following'};
  EditProfile: undefined;
  SettingsActivity: undefined;
  Saved: undefined;
  Resume: undefined;
  Support: undefined;
  Analytics: undefined;
  PasswordSetting: undefined;
  DeleteAccount: undefined;
  Wallet: undefined;
  ForgotPassword: {hasGoBack?: boolean};
  TotalIncome: undefined;
  BlockedUsers: undefined;
};

const Stack = appCreateStackNavigator<ProfileStackParamList>();

const screens = [
  {
    name: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'FollowerFollowing',
    component: FollowerFollowingScreen,
  },
  {
    name: 'EditProfile',
    component: EditProfileScreen,
  },
  {
    name: 'SettingsActivity',
    component: SettingsActivityScreen,
  },
  {
    name: 'Saved',
    component: SavedScreen,
  },
  {
    name: 'Resume',
    component: ResumeScreen,
  },
  {
    name: 'Support',
    component: SupportScreen,
  },
  {
    name: 'Analytics',
    component: AnalyticsScreen,
  },
  {
    name: 'PasswordSetting',
    component: PasswordSettingScreen,
  },
  {
    name: 'DeleteAccount',
    component: DeleteAccountScreen,
  },
  {
    name: 'Wallet',
    component: WalletScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
  {
    name: 'TotalIncome',
    component: TotalIncomeScreen,
  },
  {
    name: 'BlockedUsers',
    component: BlockedUsersScreen,
  },
];

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={publicScreenOption}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
