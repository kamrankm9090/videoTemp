import {ViewStyle} from 'react-native';
import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import {MoreOptionActionPayloadType} from '~/@types/globals';
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
      payload?: MoreOptionActionPayloadType;
    }>;
    'drop-down-action-sheet': SheetDefinition<{
      payload?: {
        name: string;
        control: any;
        data: any;
        label?: string;
        placeholder?: string;
        loading?: boolean;
        titleKey?: string;
        nestedTitleKey?: string;
        valueKey?: string;
        onSubmitSearch?: (val: string) => void;
        onChange?: (val: any) => void;
        disabled?: boolean;
        isObject?: boolean;
        optional?: boolean;
        searchable?: boolean;
        onLoadMore?: () => void;
        mb?: ViewStyle['marginBottom'];
        backgroundColor?: ViewStyle['backgroundColor'];
      };
    }>;
  }
}

export {};
