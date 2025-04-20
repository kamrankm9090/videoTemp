import {registerSheet} from 'react-native-actions-sheet';
import {
  PostOptionsAction,
  SharingAction,
  ReportAction,
  ReportReasonAction,
} from '~/components';

registerSheet('post-options-action', PostOptionsAction);
registerSheet('sharing-action', SharingAction);
registerSheet('report-action', ReportAction);
registerSheet('report-reason-action', ReportReasonAction);

export {};
