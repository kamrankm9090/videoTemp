import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {DollarIcon, ThreePoint} from '~/assets/svgs';
import {AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {fontSize, scale} from '~/utils/style';
import AppTouchable from '../AppTouchable';

const borderRadius = scale(10);

type TipCardProps = {
  title?: string;
  amount?: string;
  subText?: string;
  onDotPress?: () => void;
  containerStyle?: ViewStyle;
};

const TipCard: React.FC<TipCardProps> = ({
  title = 'Total Tips',
  amount = '$40,1M',
  subText = '(10 KLP)',
  onDotPress,
  containerStyle,
}) => {
  return (
    <VStack space={scale(10)} style={[styles.cardContainer, containerStyle]}>
      {/* Top-right Dot Button */}
      <AppTouchable style={styles.dotButton} onPress={onDotPress}>
        <ThreePoint width={scale(25)} height={scale(25)} />
      </AppTouchable>

      {/* Icon and Title */}
      <HStack space={scale(7)} style={styles.header}>
        <DollarIcon />
        <AppText fontSize={fontSize.xNormal} color={Colors.WHITE_TRANSPARENT}>
          {title}
        </AppText>
      </HStack>

      {/* Amount */}
      <AppText fontSize={fontSize.xLarge} color={Colors.WHITE}>
        {amount} <AppText style={styles.klp}>{subText}</AppText>
      </AppText>
    </VStack>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.NERO,
    borderRadius: borderRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.NIGHT_RIDER,
    position: 'relative',
    width: '100%',
  },
  dotButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.Nero_4,
    padding: 8,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  klp: {
    color: Colors.GRAY_6,
    fontSize: 14,
  },
});

export default TipCard;
