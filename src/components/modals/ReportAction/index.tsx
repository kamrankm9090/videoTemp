import React from 'react';
import {SheetProps} from 'react-native-actions-sheet';
import {ChevronRight} from '~/assets/svgs';
import {
  ActionSheetContainer,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {height} from '~/utils/style';
import {switchActions} from '~/utils/utils';

const reportData = [
  {
    id: 0,
    title: 'Offensive language',
    onPress: () => {},
  },
  {
    id: 1,
    title: 'Harassment or bullying',
    onPress: () => {},
  },
  {
    id: 2,
    title: 'Spam or misleading information',
    onPress: () => {},
  },
  {
    id: 3,
    title: 'Violence or harm',
    onPress: () => {},
  },
  {
    title: 'Other',
    id: 4,
    onPress: () => switchActions('report-reason-action', 'report-action'),
  },
];

export default function ReportAction(props: SheetProps) {
  return (
    <ActionSheetContainer minHeight={height * 0.45}>
      <VStack space={30} flex={1}>
        <AppText color={Colors.WhiteSmoke} fontFamily="bold">
          Report Reason
        </AppText>
        <VStack space={16}>
          {reportData?.map(item => {
            return (
              <ReportRow
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

function ReportRow({title, onPress}: any) {
  return (
    <AppTouchable onPress={onPress}>
      <HStack py={16} px={16} bg={Colors.NightRider} rounded={8} space={16}>
        <AppText flex={1}>{title}</AppText>
        <ChevronRight />
      </HStack>
    </AppTouchable>
  );
}
