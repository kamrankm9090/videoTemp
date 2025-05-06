import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {AppContainer, AppText, AppTouchable, VStack} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';

const LiveEndedScreen = () => {
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
          bg={Colors.BLACK_TRANSPARENT_6}>
          <AppText
            fontSize={20}
            fontWeight="bold"
            color={Colors.WHITE}
            marginBottom={8}>
            Live Has Ended.
          </AppText>
          <AppText fontSize={14} color={Colors.WHITE} marginBottom={8}>
            Thanks for watching!
          </AppText>
          <AppTouchable
            onPress={() => navigate('HomeTab')}
            bg={Colors.PRIMARY}
            px={24}
            py={12}
            borderRadius={12}>
            <AppText fontSize={14} fontWeight="bold" color={Colors.WHITE}>
              Back to home
            </AppText>
          </AppTouchable>
        </VStack>
      </ImageBackground>
    </AppContainer>
  );
};

export default LiveEndedScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});
