import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ArchiveIcon,
  DocumentTextIcon,
  DollarCircleIcon,
  FullScreenIcon,
  LikeIcon,
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
  LiveCommentSection,
  VStack,
} from '~/components';
import {
  useAgora_GetRecordFilesQuery,
  useLive_DeleteLiveMutation,
  useLive_GetLivesQuery,
  useLive_LikeMutation,
  useLive_ViewLiveMutation,
} from '~/graphql/generated';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {height, width} from '~/utils/style';

const ContentViewerScreen = ({route}: NavigationProp) => {
  const params: any = route?.params;

  const [fullScreen, setFullScreen] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const userData = userDataStore(state => state?.userData);

  const {data: followData} = useLive_GetLivesQuery({
    where: {
      live: {
        id: {eq: params?.item?.live?.id},
      },
    },
  });
  const liveData = followData?.live_getLives?.result?.items?.[0];
  const [likeNumber, setLikeNumber] = useState(liveData?.live?.likeCount || 0);
  const [isLiked, setIsLiked] = useState(liveData?.isLiked || false);

  console.log(liveData?.live?.likeCount);

  const {mutate: likeMutate} = useLive_LikeMutation();
  const {mutate: deleteLikeMutate} = useLive_DeleteLiveMutation();
  const {mutate: viewLiveMutate} = useLive_ViewLiveMutation();

  useEffect(() => {
    viewLiveMutate(
      {liveId: params?.item?.live?.id},
      {
        onSuccess(data, variables, context) {},
      },
    );
  }, []);

  const likeHanddler = () => {
    if (isLiked) {
      deleteLikeMutate(
        {liveId: params?.item?.live?.id},
        {
          onSuccess(data, variables, context) {
            setIsLiked(false);
            setLikeNumber(likeNumber - 1);
            console.log(data);
          },
        },
      );
    } else {
      likeMutate(
        {liveId: params?.item?.live?.id},
        {
          onSuccess(data, variables, context) {
            setIsLiked(true);
            setLikeNumber(likeNumber + 1);
            console.log(data);
          },
        },
      );
    }
  };

  const {data} = useAgora_GetRecordFilesQuery({
    liveId: params?.item?.live?.id,
  });

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
      key: 'like',
      icon: isLiked ? <LikeIcon fill={Colors.PRIMARY} /> : <LikeIcon  />,
      number: likeNumber,
      onPress: () => likeHanddler(),
    },
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

  console.log(
    params?.item?.live?.id,
    getFullImageUrl(data?.agora_getRecordFiles?.result?.items?.[0]?.name),
  );

  return (
    <AppContainer backgroundColor={Colors.BLACK_TRANSPARENT_8}>
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

        <HStack
          justifyContent="space-between"
          position="absolute"
          top={10}
          left={0}
          right={0}>
          <ContentViewerHeader
            user={params?.item?.live?.user}
            isFollowed={params?.item?.isFollowed || liveData?.isFollowed}
            viewCount={liveData?.live?.viewCount || 0}
          />
        </HStack>

        <HStack
          justifyContent="space-between"
          m={16}
          position="absolute"
          top={60}
          left={0}
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

        {!fullScreen && (
          <VStack style={styles.bottomRightContainer}>
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
};

export default ContentViewerScreen;

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
});
