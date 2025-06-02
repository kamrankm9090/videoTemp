import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {AppButton, AppContainer, AppText, VStack} from '~/components';
import {resetRoot} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function LiveEndedScreen() {
  function backToHomeOnPress() {
    resetRoot('MainTabs');
  }

  return (
    <AppContainer backgroundColor={Colors.BLACK}>
      <ImageBackground
        source={{uri: 'https://your-video-thumbnail-or-background-image'}}
        style={styles.background}
        blurRadius={5}>
        <VStack
          alignItems="center"
          justifyContent="center"
          flex={1}
          px={32}
          space={20}
          bg={Colors.BLACK_TRANSPARENT_6}>
          <AppText
            fontSize={fontSize.xLarge}
            fontWeight="bold"
            color={Colors.WHITE}>
            Live Has Ended.
          </AppText>
          <AppText fontSize={fontSize.medium} color={Colors.WHITE}>
            Thanks for watching!
          </AppText>
          <AppButton
            width="auto"
            title="Back to home"
            onPress={backToHomeOnPress}
          />
        </VStack>
      </ImageBackground>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});
