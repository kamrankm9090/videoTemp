import React, {memo} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {EmptyIcon} from '~/assets/svgs';
import {AppIndicator, AppText, VStack} from '~/components';
import {height, scale} from '~/utils/style';

type EmptyStateProps = {
  icon?: React.ReactNode;
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  h?: number | null;
  isLoading?: boolean;
};

const Empty: React.FC<EmptyStateProps> = ({
  icon = <EmptyIcon />,
  text = 'No data available',
  style,
  textStyle,
  h = height * 0.7,
  isLoading = false,
}) => {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      h={h}
      style={style}
      space={scale(30)}>
      {isLoading ? (
        <AppIndicator />
      ) : (
        <>
          {icon}
          <AppText textAlign="center" lineHeight={scale(25)} style={textStyle}>
            {text}
          </AppText>
        </>
      )}
    </VStack>
  );
};

export default memo(Empty);
