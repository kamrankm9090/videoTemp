import {AppNavigatorParamList} from './AppNavigator';
import {AuthStackParamList} from './AuthStack';
import {LiveStackParamList} from './LiveStack';
import {MainStackParamList} from './MainStack';

export type RootStackParamList = AppNavigatorParamList &
  AuthStackParamList &
  MainStackParamList &
  LiveStackParamList;
