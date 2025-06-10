import {
  useViolationReport_CreateViolationReportMutation,
  ViolationReportInput,
} from '~/graphql/generated';
import {userDataStore} from '~/stores';
import {showSuccessMessage} from '~/utils/utils';

export const useReportHandler = () => {
  const {userData} = userDataStore(state => state);

  const {mutate: mutateViolationReport, isLoading} =
    useViolationReport_CreateViolationReportMutation();

  function reportHandler({
    liveId,
    reason,
    onSuccess,
  }: {
    liveId: number;
    reason: string;
    onSuccess?: () => void;
  }) {
    const input: ViolationReportInput = {
      userId: userData?.id,
      targetEntityId: liveId,
      reason: reason,
      targetEntityName: 'live',
    };

    mutateViolationReport(
      {input},
      {
        onSuccess: response => {
          if (
            response?.violationReport_createViolationReport?.status?.code === 1
          ) {
            showSuccessMessage('Report sent successfully');
            onSuccess?.();
          }
        },
      },
    );
  }

  return {reportHandler, isLoading};
};
