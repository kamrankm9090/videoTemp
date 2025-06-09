import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import {
  ConfirmationAction,
  CreateCommunityAction,
  CreateOptionsAction,
  DropDownActionSheet,
  MoreOptionAction,
  OfferSelectOptionAction,
  PostOptionsAction,
  ReportAction,
  ReportReasonAction,
  SharingAction,
} from '~/components';
import { CommunityType } from '~/graphql/generated';

registerSheet('post-options-action', PostOptionsAction);
registerSheet('sharing-action', SharingAction);
registerSheet('report-action', ReportAction);
registerSheet('report-reason-action', ReportReasonAction);
registerSheet('create-options-action', CreateOptionsAction);
registerSheet('confirmation-action', ConfirmationAction);
registerSheet('offer-select-option-action', OfferSelectOptionAction);
registerSheet('more-option-action', MoreOptionAction);
registerSheet('create-community-action', CreateCommunityAction);
registerSheet('drop-down-action-sheet', DropDownActionSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'confirmation-action': SheetDefinition<{
      payload?: ConfirmationActionPayloadType;
    }>;
    'more-option-action': SheetDefinition<{
      payload?: CommunityType;
    }>;
    'create-community-action': SheetDefinition<{
      payload?: CommunityType;
    }>;
    'drop-down-action-sheet': SheetDefinition<{
      payload?: DropDownActionPayLoadType;
    }>;
  }
}

export {};
