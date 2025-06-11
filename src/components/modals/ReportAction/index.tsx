import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {ChevronRight} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppIndicator,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {useReportHandler} from '~/hooks';
import {Colors} from '~/styles';
import {height} from '~/utils/style';
import {hideSheet, switchActions} from '~/utils/utils';

export default function ReportAction(props: SheetProps<'report-action'>) {
  const liveId = props?.payload?.liveId;
  const showToastInActionSheet =
    props?.payload?.showToastInActionSheet || false;

  const reportData = [
    {
      id: 0,
      title: 'Offensive language',
    },
    {
      id: 1,
      title: 'Harassment or bullying',
    },
    {
      id: 2,
      title: 'Spam or misleading information',
    },
    {
      id: 3,
      title: 'Violence or harm',
    },
    {
      title: 'Other',
      id: 4,
      onPress: () => switchActions('report-reason-action', 'report-action'),
    },
  ];

  return (
    <ActionSheetContainer
      showToastInActionSheet={showToastInActionSheet}
      minHeight={height * 0.45}>
      <VStack space={30} flex={1}>
        <AppText color={Colors.WhiteSmoke} fontFamily="bold">
          Report Reason
        </AppText>
        <VStack space={16}>
          {reportData?.map(item => {
            return (
              <ReportRow
                liveId={liveId}
                key={item?.id}
                title={item?.title}
                onPress={item?.onPress}
              />
            );
          })}
        </VStack>
      </VStack>
    </ActionSheetContainer>
  );
}

function ReportRow({
  title,
  liveId,
  onPress,
}: {
  title: string;
  liveId: number;
  onPress?: () => void;
}) {
  function onSuccessReport() {
    hideSheet('report-action');
  }

  const {reportHandler, isLoading} = useReportHandler();

  function onPressHandler() {
    onPress
      ? onPress()
      : reportHandler({
          liveId,
          reason: title,
          onSuccess: () => onSuccessReport(),
        });
  }

  return (
    <AppTouchable disabled={isLoading} onPress={onPressHandler}>
      <HStack py={16} px={16} bg={Colors.NightRider} rounded={8} space={16}>
        <AppText flex={1}>{title}</AppText>
        <ChevronRight />
        {isLoading && (
          <AppIndicator
            position="absolute"
            alignSelf="center"
            left={0}
            right={0}
          />
        )}
      </HStack>
    </AppTouchable>
  );
}
