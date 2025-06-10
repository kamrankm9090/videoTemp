import React from 'react';
import {AppLogo, ArrowLeft} from '~/assets/svgs';
import {AppTouchable, Box, Divider, VStack} from '~/components';
import {goBack} from '~/navigation/methods';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

export default function AuthHeader({hasGoBack}: {hasGoBack?: boolean}) {
  return (
    <VStack space={48} alignItems="center">
      {hasGoBack && (
        <Box position="absolute" top={scale(10)} left={0} zIndex={4}>
          <AppTouchable onPress={goBack}>
            <ArrowLeft width={scale(20)} height={scale(20)} />
          </AppTouchable>
        </Box>
      )}
      <AppLogo width={122} height={47} />
      <Divider backgroundColor={Colors.NIGHT_RIDER} />
    </VStack>
  );
}
