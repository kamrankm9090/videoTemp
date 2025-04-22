import {registerSheet} from 'react-native-actions-sheet';
import {
  PostOptionsAction,
  SharingAction,
  ReportAction,
  ReportReasonAction,
} from '~/components';
import CreateAction from '~/components/modals/CreateAction';

registerSheet('post-options-action', PostOptionsAction);
registerSheet('sharing-action', SharingAction);
registerSheet('report-action', ReportAction);
registerSheet('report-reason-action', ReportReasonAction);
registerSheet('create-action', CreateAction);

export {};
