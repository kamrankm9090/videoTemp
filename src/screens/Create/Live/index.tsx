import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Close2,
  HotSpot2,
  Note,
  Reload,
  ThreePointVertical,
} from '~/assets/svgs';
import {
  AppButton,
  AppContainer,
  AppImage,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import useInitRtcEngine from '~/hooks/agora/useInitRtcEngine';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function LiveScreen() {
  return (
    <AppContainer>
      <CreateLiveHeader />
      <ExperienceCard />
      <LiveCard />
      <CreateLiveFooter />
    </AppContainer>
  );
}

function CreateLiveHeader() {
  const insets = useSafeAreaInsets();

  function closeHandler() {}

  return (
    <HStack
      py={10}
      px={56}
      top={insets.top}
      space={8}
      position="absolute"
      justifyContent="center">
      <AppTouchable
        p={18}
        rounded={8}
        onPress={closeHandler}
        bg={Colors.Nero_2}
        alignItems="center"
        justifyContent="center">
        <Close2 />
      </AppTouchable>
      <HStack rounded={8} bg={Colors.Nero_2} space={12} py={10} px={12}>
        <AppImage imageSource={''} resizeMode="stretch" style={styles.avatar} />
        <AppText numberOfLines={1} flex={1}>
          Luna Miller
        </AppText>
        <HStack space={4}>
          <AppText>0</AppText>
          <HotSpot2 />
        </HStack>
        <AppTouchable>
          <ThreePointVertical />
        </AppTouchable>
      </HStack>
    </HStack>
  );
}

function CreateLiveFooter() {
  const insets = useSafeAreaInsets();

  return (
    <VStack px={24} w="100%" bottom={insets.bottom} position="absolute">
      <HStack space={16}>
        <AppButton flex={1} width="auto" title="Start live" />
        <AppTouchable rounded={8} p={7} bg={Colors.Silver_transparent_80}>
          <Reload />
        </AppTouchable>
      </HStack>
    </VStack>
  );
}

function ExperienceCard() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <VStack
      w="90%"
      bg={Colors.BLACK_TRANSPARENT}
      p={16}
      rounded={16}
      alignSelf="center"
      justifyContent="flex-end"
      style={{height: 550}}
      position="relative"
      overflow="hidden">
      <AppImage
        imageSource={'https://via.placeholder.com/400x600'}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <VStack space={12}>
        <AppText fontFamily="bold" fontSize={fontSize.large}>
          Maximize You Experience:
        </AppText>

        {!expanded ? (
          <>
            <AppText color={Colors.DarkGray} numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur
            </AppText>
            <AppText
              right={0}
              bottom={-20}
              position="absolute"
              color={Colors.PRIMARY}
              onPress={() => setExpanded(true)}>
              show more...
            </AppText>
          </>
        ) : (
          <VStack space={12}>
            <AppText color={Colors.VeryLightGrey}>
              I want to make a film in the field of cosmetics and skincare
              products, and I am currently looking for these skills for this
              project.
            </AppText>

            <AppTouchable
              py={6}
              px={12}
              gap={8}
              rounded={8}
              flexDirection="row"
              alignSelf="flex-start">
              <Note />
              <AppText fontWeight="bold">See Resume</AppText>
            </AppTouchable>

            <HStack justifyContent="space-between">
              <VStack space={24}>
                <AppText color={Colors.DarkGray}>Category</AppText>
                <AppText fontFamily="bold">Beauty</AppText>
              </VStack>
              <VStack space={24}>
                <AppText color={Colors.DarkGray}>Price</AppText>
                <AppText fontFamily="bold">$45</AppText>
              </VStack>
            </HStack>

            <HStack alignItems="flex-end">
              <VStack flex={1} space={24}>
                <AppText color={Colors.DarkGray}>Publishing schedule: </AppText>
                <AppText fontFamily="bold">2024/2/10 , 3:15 AM</AppText>
              </VStack>

              <AppText
                color={Colors.PRIMARY}
                onPress={() => setExpanded(false)}>
                show Less...
              </AppText>
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}

function LiveCard() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } = useInitRtcEngine(enableVideo);

  return (
    <>
      <></>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
