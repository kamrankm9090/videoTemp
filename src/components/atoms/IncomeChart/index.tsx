import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {DollarIcon} from '~/assets/svgs';
import {Box, HStack, VStack, AppText} from '~/components';
import {Colors} from '~/styles';
import {fontSize, scale, width} from '~/utils/style';

const screenWidth = width;

type Props = {
  data: {date: string; value: number}[];
  tooltipIndex?: number; // active point index to show tooltip
};

const IncomeChart = ({data, tooltipIndex}: Props) => {
  const chartData = {
    labels: data.map(item => item.date.slice(0, 3)), // Show "Mon", "Tue", etc.
    datasets: [{data: data.map(item => item.value)}],
  };

  const tooltip = data[tooltipIndex ?? -1];

  return (
    <VStack space={scale(35)} style={styles.container}>
      <HStack p={scale(20)} space={scale(10)}>
        <DollarIcon />
        <AppText color={Colors.WHITE_TRANSPARENT} fontSize={fontSize.xNormal}>
          Total Income
        </AppText>
      </HStack>

      <LineChart
        data={chartData}
        width={screenWidth - scale(30)}
        height={scale(220)}
        withInnerLines
        yAxisSuffix="M"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: Colors.NERO,
          backgroundGradientTo: Colors.NERO,
          decimalPlaces: 0,
          color: () => Colors.PRIMARY,
          labelColor: () => Colors.WHITE_TRANSPARENT,
          style: {
            paddingStart: 0,
            paddingLeft: 0,
            padding: 0,
            margin: 0,
            marginLeft: 0,
            marginStart: 0,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: Colors.PRIMARY,
            fill: Colors.NERO,
          },
          propsForBackgroundLines: {
            stroke: Colors.TRANSPARENT,
          },
        }}
        bezier
        style={{borderRadius: scale(16)}}
        getDotColor={() => Colors.PRIMARY}
        decorator={() => {
          if (tooltipIndex == null || tooltipIndex < 0) return null;

          const x =
            ((screenWidth - 40) / data.length) * tooltipIndex +
            (screenWidth - 40) / data.length / 2;

          const y = 220 - (tooltip.value / 40) * scale(160); // Assuming max 40M

          return (
            <Box
              style={{
                position: 'absolute',
                left: x - 60,
                top: y - 80,
                width: scale(100),
                backgroundColor: Colors.PRIMARY,
                borderRadius: 8,
                padding: 6,
              }}>
              <AppText color={Colors.WHITE} fontSize={fontSize.tiny}>
                {tooltip.date}
              </AppText>
              <AppText color={Colors.WHITE} fontSize={fontSize.small}>
                ${tooltip.value}M
              </AppText>
            </Box>
          );
        }}
      />
    </VStack>
  );
};

export default IncomeChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.NERO,
    borderRadius: scale(10),
    borderColor: Colors.NIGHT_RIDER,
    borderWidth: 1,
  },
});
