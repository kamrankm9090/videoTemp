import {AppNavigatorParamList} from './AppNavigator';
import {LiveStackParamList} from './LiveStack';
import {MainStackParamList} from './MainStack';

export type RootStackParamList = AppNavigatorParamList &
  MainStackParamList &
  LiveStackParamList;
