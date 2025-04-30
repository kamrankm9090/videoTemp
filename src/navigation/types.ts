import {AppNavigatorParamList} from './AppNavigator';
import {AuthStackParamList} from './AuthStack';
import {CommunityStackParamList} from './CommunityStack';
import {CreateStackParamList} from './CreateStack';
import {HomeStackParamList} from './HomeStack';
import {LiveStackParamList} from './LiveStack';
import {MainStackParamList} from './MainStack';
import {MainTabParamList} from './MainTabs';
import {OffersStackParamList} from './OffersStack';
import {ProfileStackParamList} from './ProfileStack';

export type RootStackParamList = AppNavigatorParamList &
  HomeStackParamList &
  AuthStackParamList &
  MainStackParamList &
  LiveStackParamList &
  OffersStackParamList &
  CommunityStackParamList &
  ProfileStackParamList &
  CreateStackParamList &
  MainTabParamList;
