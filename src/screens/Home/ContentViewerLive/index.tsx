import React, {ReactElement, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ClientRoleType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  RtcSurfaceView,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
} from 'react-native-agora';
import {useSnapshot} from 'valtio';
import {
  AppContainer,
  BaseComponent,
  BaseRenderUsers,
  LiveCommentSection,
  LiveHeader,
  RenderNothing,
  VStack,
} from '~/components';
import useInitRtcEngine from '~/hooks/agora/useInitRtcEngine';
import {goBack} from '~/navigation/methods';
import {liveStore} from '~/stores';
import * as log from '~/utils/log';
import {height, width} from '~/utils/style';

const setupMode = VideoViewSetupMode.VideoViewSetupReplace;

export default function ContentViewerLiveScreen() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } = useInitRtcEngine(enableVideo);

  const {liveData, resetLiveStore} = useSnapshot(liveStore);

  useEffect(() => {
    setTimeout(() => {
      joinChannel();
    }, 5000);
  }, []);

  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }
    engine.current.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleAudience,
      // clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leaveChannel = () => {
    engine.current.leaveChannel();
    resetLiveStore();
    goBack();
  };

  useEffect(() => {
    engine.current.addListener(
      'onVideoDeviceStateChanged',
      (deviceId: string, deviceType: number, deviceState: number) => {
        log.info(
          'onVideoDeviceStateChanged',
          'deviceId',
          deviceId,
          'deviceType',
          deviceType,
          'deviceState',
          deviceState,
        );
      },
    );

    engine.current.addListener(
      'onLocalVideoStateChanged',
      (
        source: VideoSourceType,
        state: LocalVideoStreamState,
        error: LocalVideoStreamReason,
      ) => {
        log.info(
          'onLocalVideoStateChanged',
          'source',
          source,
          'state',
          state,
          'error',
          error,
        );
      },
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine]);

  return (
    <AppContainer>
      <LiveHeader
        user={{
          photoUrl: liveData?.user?.photoUrl,
          username: liveData?.user?.username,
        }}
        isOwner={false}
        onClose={leaveChannel}
      />
      <BaseComponent
        name={'JoinChannelVideo'}
        renderChannel={RenderNothing}
        renderUsers={() => (
          <BaseRenderUsers
            enableVideo={enableVideo}
            renderVideo={renderVideo}
            startPreview={startPreview}
            joinChannelSuccess={joinChannelSuccess}
            remoteUsers={remoteUsers}
          />
        )}
      />

      <VStack p={10} mb={30}>
        <LiveCommentSection />
      </VStack>
    </AppContainer>
  );

  function renderVideo(user: VideoCanvas): ReactElement | undefined {
    if (user.uid === 0 && remoteUsers.length === 0) {
      return;
    }

    return (
      <RtcSurfaceView
        style={styles.video}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={{...user, setupMode}}
      />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    height: height,
    width: width,
    alignSelf: 'center',
  },
});

// function CreateLiveFooter({
//   startOnPress,
//   switchOnPress,
// }: {
//   startOnPress?: () => void;
//   switchOnPress?: () => void;
// }) {
//   const insets = useSafeAreaInsets();

//   return (
//     <VStack
//       zIndex={779}
//       px={24}
//       w="100%"
//       bottom={insets.bottom}
//       position="absolute">
//       <HStack space={16}>
//         <AppButton
//           onPress={startOnPress}
//           flex={1}
//           width="auto"
//           title="Start live"
//         />
//         <AppTouchable
//           onPress={switchOnPress}
//           rounded={8}
//           p={7}
//           bg={Colors.Silver_transparent_80}>
//           <Reload />
//         </AppTouchable>
//       </HStack>
//     </VStack>
//   );
// }

// function ExperienceCard() {
//   const {liveData} = useSnapshot(liveStore);
//   const [expanded, setExpanded] = useState<boolean>(false);

//   return (
//     <VStack
//       w="90%"
//       p={16}
//       rounded={16}
//       zIndex={777}
//       alignSelf="center"
//       justifyContent="flex-start"
//       maxH={height * 0.5}
//       minH={height * 0.3}
//       position="absolute"
//       bottom={200}>
//       <VStack space={12}>
//         <AppText fontFamily="bold" fontSize={fontSize.large}>
//           {liveData?.title}
//         </AppText>

//         {!expanded ? (
//           <>
//             <AppText color={Colors.DarkGray} numberOfLines={2}>
//               {liveData?.description}
//             </AppText>
//             <AppText
//               right={0}
//               zIndex={800}
//               bottom={-20}
//               position="absolute"
//               color={Colors.PRIMARY}
//               onPress={() => setExpanded(true)}>
//               show more...
//             </AppText>
//           </>
//         ) : (
//           <VStack space={12}>
//             <AppText color={Colors.VeryLightGrey}>
//               {liveData?.description}
//             </AppText>

//             <AppTouchable
//               py={6}
//               px={12}
//               gap={8}
//               rounded={8}
//               flexDirection="row"
//               bg={Colors.Nero_3}
//               alignSelf="flex-start">
//               <Note />
//               <AppText fontWeight="bold">See Resume</AppText>
//             </AppTouchable>

//             <HStack justifyContent="space-between">
//               <VStack space={16}>
//                 <AppText color={Colors.DarkGray}>Category</AppText>
//                 <AppText fontFamily="bold">{liveData?.category?.title}</AppText>
//               </VStack>
//               <VStack space={16}>
//                 <AppText color={Colors.DarkGray}>Price</AppText>
//                 <AppText fontFamily="bold">
//                   {liveData?.isFree ? 'Free' : `$${liveData?.price}`}
//                 </AppText>
//               </VStack>
//             </HStack>

//             <HStack mt={16} alignItems="flex-end">
//               <VStack flex={1} space={24}>
//                 <AppText color={Colors.DarkGray}>Publishing schedule: </AppText>
//                 <AppText fontFamily="bold">
//                   {liveData?.isSchedule
//                     ? `${appFormatDate(
//                         liveData?.publishingScheduleDate,
//                         'YYYY/m/dd',
//                       )}, ${appFormatDate(liveData?.publishingScheduleTime)}`
//                     : '-'}
//                 </AppText>
//               </VStack>

//               <AppText
//                 zIndex={800}
//                 color={Colors.PRIMARY}
//                 onPress={() => setExpanded(false)}>
//                 show Less...
//               </AppText>
//             </HStack>
//           </VStack>
//         )}
//       </VStack>
//     </VStack>
//   );
// }
