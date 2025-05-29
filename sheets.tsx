import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import {
  ConfirmationAction,
  CreateCommunityAction,
  CreateOptionsAction,
  MoreOptionAction,
  OfferSelectOptionAction,
  PostOptionsAction,
  ReportAction,
  ReportReasonAction,
  SharingAction,
} from '~/components';

registerSheet('post-options-action', PostOptionsAction);
registerSheet('sharing-action', SharingAction);
registerSheet('report-action', ReportAction);
registerSheet('report-reason-action', ReportReasonAction);
registerSheet('create-options-action', CreateOptionsAction);
registerSheet('confirmation-action', ConfirmationAction);
registerSheet('offer-select-option-action', OfferSelectOptionAction);
registerSheet('more-option-action', MoreOptionAction);
registerSheet('create-community-action', CreateCommunityAction);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'confirmation-action': SheetDefinition<{
      payload?: ConfirmationActionPayloadType;
    }>;
  }
}

export {};
