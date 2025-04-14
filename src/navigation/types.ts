import {AppNavigatorParamList} from './AppNavigator';
import {AuthStackParamList} from './AuthStack';
import {CommunityStackParamList} from './CommunityStack';
import {CreateStackParamList} from './CreateStack';
import {LiveStackParamList} from './LiveStack';
import {MainStackParamList} from './MainStack';
import {OffersStackParamList} from './OffersStack';
import {ProfileStackParamList} from './ProfileStack';

export type RootStackParamList = AppNavigatorParamList &
  AuthStackParamList &
  MainStackParamList &
  LiveStackParamList &
  OffersStackParamList &
  CommunityStackParamList &
  ProfileStackParamList &
  CreateStackParamList;
