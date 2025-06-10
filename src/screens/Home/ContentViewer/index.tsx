import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';
import {
  ArchiveIcon,
  DocumentTextIcon,
  DollarCircleIcon,
  FullScreenIcon,
  LockIcon2,
  MinimizeScreenIcon,
  Send2Icon,
  VolumeSlashIcon,
} from '~/assets/svgs';
import {
  AppContainer,
  AppIndicator,
  AppText,
  AppTouchable,
  AppVideoPlayer,
  ContentDescriptionCard,
  ContentViewerHeader,
  HStack,
  LikeButton,
  LiveCommentSection,
  VStack,
} from '~/components';
import {
  useAgora_GetRecordFilesQuery,
  useLive_ViewLiveMutation,
} from '~/graphql/generated';
import {contentStore} from '~/stores';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {height, width} from '~/utils/style';

export default function ContentViewerScreen() {
  const {contentData: liveData} = useSnapshot(contentStore);
  const liveId = liveData?.live?.id;
  const user = liveData?.live?.user;
  const isFollowed = liveData?.live?.isFollowed;

  const [fullScreen, setFullScreen] = useState<boolean>(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  // const userData = userDataStore(state => state?.userData);

  // const {data: followData} = useLive_GetLivesQuery({
  //   where: {
  //     live: {
  //       id: {eq: liveId},
  //     },
  //   },
  // });
  // const liveData = followData?.live_getLives?.result?.items?.[0];

  const {mutate: viewLiveMutate} = useLive_ViewLiveMutation();

  useEffect(() => {
    if (liveId) {
      viewLiveMutate(
        {liveId},
        {
          onSuccess() {},
        },
      );
    }
  }, [liveId]);

  const {data} = useAgora_GetRecordFilesQuery({
    liveId,
  });

  return (
    <AppContainer backgroundColor={Colors.BLACK_TRANSPARENT_8}>
      {/* <LockLayer /> */}
      <VStack flex={1} position="relative">
        <AppVideoPlayer
          style={styles.videoPlayer}
          fullscreen={false}
          controls={false}
          resizeMode="cover"
          source={{
            uri: getFullImageUrl(
              data?.agora_getRecordFiles?.result?.items?.[0]?.name,
            ),
          }}
          onLoadStart={() => setIsLoadingVideo(true)}
          onLoad={() => setIsLoadingVideo(false)}
          onBuffer={({isBuffering}) => setIsLoadingVideo(isBuffering)}
        />

        {isLoadingVideo && (
          <VStack
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            alignItems="center"
            justifyContent="center"
            zIndex={10}
            bg={Colors.BLACK_TRANSPARENT_6}>
            <AppText fontSize={14} color={Colors.WHITE} marginBottom={8}>
              Loading video...
            </AppText>
            <AppIndicator size="large" color={Colors.WHITE} />
          </VStack>
        )}

        <ContentViewerHeader
          user={user}
          isFollowed={isFollowed || liveData?.isFollowed}
          viewCount={liveData?.live?.viewCount || 0}
        />

        <TopLeftItems fullScreen={fullScreen} setFullScreen={setFullScreen} />

        {!fullScreen && (
          <RightItems
            liveId={liveId}
            isLiked={liveData?.isLiked}
            likeCount={liveData?.live?.likeCount}
          />
        )}

        {!fullScreen ? (
          <VStack style={styles.contentArea}>
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
            <VStack w={width} p={10} position="absolute" bottom={15} pt={40}>
              <LiveCommentSection key={1} />
            </VStack>
          </>
        )}
      </VStack>
    </AppContainer>
  );
}

function TopLeftItems({
  fullScreen = false,
  setFullScreen,
}: {
  fullScreen?: boolean;
  setFullScreen: (state: boolean) => void;
}) {
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

  return (
    <HStack
      justifyContent="space-between"
      m={16}
      position="absolute"
      top={60}
      left={0}
      zIndex={710}
      right={0}>
      <VStack style={styles.topLeftContainer}>
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
              fontWeight="500"
              fontSize={13}
              color={Colors.BLACK_TRANSPARENT_8}>
              {item.title}
            </AppText>
          </AppTouchable>
        ))}
      </VStack>
      <AppTouchable
        style={styles.fullScreenButton}
        onPress={() => setFullScreen(!fullScreen)}>
        {fullScreen ? <MinimizeScreenIcon /> : <FullScreenIcon />}
      </AppTouchable>
    </HStack>
  );
}

function RightItems({
  liveId,
  likeCount = 0,
  isLiked = false,
}: {
  liveId: number;
  likeCount?: number;
  isLiked?: boolean;
}) {
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
    <VStack
      zIndex={710}
      position="absolute"
      right={24}
      bottom={height / 2}
      space={16}>
      <LikeButton
        orientation="vertical"
        isLiked={isLiked}
        liveId={liveId}
        likeCount={likeCount}
        p={6}
        rounded={100}
        alignItems="center"
        bg={Colors.WHITE_TRANSPARENT_2}
      />
      {bottomRightItems.map(item => (
        <VStack key={item?.key}>
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
          {item?.number && (
            <AppText
              fontSize={12}
              fontWeight={'400'}
              marginTop={4}
              alignSelf="center">
              {item?.number}
            </AppText>
          )}
        </VStack>
      ))}
    </VStack>
  );
}

function LockLayer() {
  return (
    <>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={18}
        reducedTransparencyFallbackColor={Colors.BLACK}
      />
      <VStack
        alignSelf="center"
        position="absolute"
        justifyContent="center"
        alignItems="center"
        top={0}
        bottom={0}
        flex={1}
        zIndex={701}
        space={12}>
        <LockIcon2 />
        <AppText color={Colors.GAINSBORO} lineHeight={28} textAlign="center">
          {'Access to this content\nrequires a payment'}
        </AppText>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  videoPlayer: {
    flexGrow: 1,
    marginBottom: 30,
  },
  fullScreenButton: {
    zIndex: 2,
  },
  topLeftContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  bottomRightContainer: {
    position: 'absolute',
    right: 24,
    bottom: height / 2,
    gap: 8,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 600,
    zIndex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 700,
  },
});
