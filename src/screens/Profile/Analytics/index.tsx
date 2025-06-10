import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {ArrowDown, ExportIcon} from '~/assets/svgs';
import {
  AppContainer,
  AppHeader,
  AppScrollView,
  AppText,
  AppTouchable,
  HStack,
  IncomeChart,
  TipCard,
  VStack,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const chartData = [
  {date: 'Mon', value: 2},
  {date: 'Tue', value: 12},
  {date: 'Wed', value: 25},
  {date: 'Thu', value: 38}, // <- show tooltip here
  {date: 'Fri', value: 20},
  {date: 'Sat', value: 29},
  {date: 'Sun', value: 41},
];

const AnalyticsScreen = () => {
  return (
    <AppContainer>
      <AppHeader
        title="Analytics"
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
      />
      <AppScrollView bounces={false} contentContainerStyle={styles.scrollView}>
        <VStack px={scale(12)} space={scale(25)}>
          <HStack
            space={scale(10)}
            justifyContent="space-between"
            alignItems="center">
            <Item title="Daily" icon={<ArrowDown />} onPress={() => null} />
            <Item title="Export" icon={<ExportIcon />} onPress={() => null} />
          </HStack>
          <TipCard />
          <TipCard
            title="Total Income"
            subText=""
            onDotPress={() =>
              navigate('ProfileStack', {
                screen: 'TotalIncome',
              })
            }
          />
          <IncomeChart data={chartData} tooltipIndex={3} />
        </VStack>
      </AppScrollView>
    </AppContainer>
  );
};

export default AnalyticsScreen;

const Item = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: ReactNode;
  onPress: () => void;
}) => {
  return (
    <AppTouchable flex={1} onPress={onPress}>
      <HStack
        bg={Colors.NERO}
        px={scale(14)}
        py={scale(15)}
        borderRadius={scale(10)}
        borderWidth={1}
        borderColor={Colors.NIGHT_RIDER}
        w="100%"
        justifyContent="space-between"
        alignItems="center">
        <AppText>{title}</AppText>
        {icon && icon}
      </HStack>
    </AppTouchable>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: scale(70),
    paddingTop: scale(20),
  },
});
