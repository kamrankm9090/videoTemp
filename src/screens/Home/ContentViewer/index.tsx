import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ArchiveIcon,
  DocumentTextIcon,
  DollarCircleIcon,
  FullScreenIcon,
  MinimizeScreenIcon,
  Send2Icon,
  VolumeSlashIcon,
} from '~/assets/svgs';
import {
  AppContainer,
  AppGradientView,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  ContentDescriptionCard,
  ContentViewerHeader,
  HStack,
  LiveCommentSection,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize, width} from '~/utils/style';

const ContentViewerScreen = ({route}: NavigationProp) => {
  const params = route?.params;
  const [fullScreen, setFullScreen] = useState(false);

  const topLeftItems = [
    {
      key: 'resume',
      title: 'Resume',

      icon: <DocumentTextIcon />,
      onPress: () => {},
    },
    {
      key: 'tip',
      title: 'Tip',
      icon: <DollarCircleIcon />,
      onPress: () => {},
    },
  ];

  const bottomRightItems = [
    {
      key: 'send',
      icon: <Send2Icon />,
      onPress: () => {},
    },
    {
      key: 'archive',
      icon: <ArchiveIcon />,
      onPress: () => {},
    },
    {
      key: 'mute',
      icon: <VolumeSlashIcon />,
      onPress: () => {},
    },
  ];

  return (
    <AppContainer safeArea backgroundColor={Colors.BLACK_TRANSPARENT_8}>
      <AppVideoPlayer
        style={styles.videoPlayer}
        fullscreen={false}
        controls={false}
        source={{
          uri: 'https://videos.pexels.com/video-files/3195394/3195394-sd_640_360_25fps.mp4',
        }}>
        <ContentViewerHeader />
        <HStack justifyContent="space-between" m={16}>
          <HStack space={8}>
            {topLeftItems.map(item => (
              <AppTouchable
                key={item.key}
                bg={Colors.WHITE_TRANSPARENT_6}
                p={6}
                borderRadius={14}
                gap={6}
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                zIndex={2}
                onPress={item.onPress}>
                {item.icon}
                <AppText
                  fontFamily="medium"
                  fontSize={fontSize.small}
                  color={Colors.BLACK_TRANSPARENT_8}>
                  {item.title}
                </AppText>
              </AppTouchable>
            ))}
          </HStack>
          <AppTouchable zIndex={2} onPress={() => setFullScreen(!fullScreen)}>
            {fullScreen ? <MinimizeScreenIcon /> : <FullScreenIcon />}
          </AppTouchable>
        </HStack>

        {!fullScreen && (
          <VStack space={8} right={24} bottom={24} position="absolute">
            {bottomRightItems.map(item => (
              <AppTouchable
                key={item.key}
                bg={Colors.WHITE_TRANSPARENT_2}
                p={6}
                borderRadius={100}
                justifyContent="center"
                alignItems="center"
                zIndex={2}
                onPress={item.onPress}>
                {item.icon}
              </AppTouchable>
            ))}
          </VStack>
        )}
      </AppVideoPlayer>

      {!fullScreen ? (
        <VStack flex={1} px={16}>
          <ContentDescriptionCard
            title="Maximize You Experience:"
            description="I want to make a film in the field of cosmetics and skincare products, and I am currently looking for these skills for this project."
            category="Beauty"
            price="$45"
            schedule="2024/2/10, 3:15 AM"
          />
        </VStack>
      ) : (
        <>
          <VStack
            w={width}
            p={10}
            position="absolute"
            bottom={20}
            zIndex={2}
            pt={40}>
            <LiveCommentSection />
          </VStack>
          <AppGradientView />
        </>
      )}
    </AppContainer>
  );
};

export default ContentViewerScreen;

const styles = StyleSheet.create({
  videoPlayer: {
    flexGrow: 1,
    marginBottom: 30,
  },
});
