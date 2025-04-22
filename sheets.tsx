import {registerSheet} from 'react-native-actions-sheet';
import {
  CreateOptionsAction,
  SharingAction,
  ReportAction,
  ReportReasonAction,
  PostOptionsAction,
} from '~/components';

registerSheet('post-options-action', PostOptionsAction);
registerSheet('sharing-action', SharingAction);
registerSheet('report-action', ReportAction);
registerSheet('report-reason-action', ReportReasonAction);
registerSheet('create-options-action', CreateOptionsAction);

export {};
