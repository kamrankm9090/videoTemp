// import React, {ReactElement, useEffect, useState} from 'react';
// import {Platform} from 'react-native';
// import {
//   ClientRoleType,
//   LocalVideoStreamReason,
//   LocalVideoStreamState,
//   RtcSurfaceView,
//   RtcTextureView,
//   VideoCanvas,
//   VideoSourceType,
//   VideoViewSetupMode,
// } from 'react-native-agora';

// import useInitRtcEngine from 'ssss/examples/hook/hooks/useInitRtcEngine';
// import {BaseComponent} from 'ssss/examples/hook/components/BaseComponent';
// import BaseRenderChannel from 'ssss/examples/hook/components/BaseRenderChannel';
// import BaseRenderUsers from 'ssss/examples/hook/components/BaseRenderUsers';
// import * as log from 'ssss/src/utils/log';
// import {
//   AgoraButton,
//   AgoraDivider,
//   AgoraDropdown,
//   AgoraStyle,
//   AgoraSwitch,
// } from 'ssss/components/ui';
// import {enumToItems} from 'ssss/src/utils';

// export default function JoinChannelVideo() {
//   const [enableVideo] = useState<boolean>(true);
//   const {
//     channelId,
//     setChannelId,
//     token,
//     uid,
//     joinChannelSuccess,
//     remoteUsers,
//     startPreview,
//     engine,
//   } =
//     /**
//      * Step 1: initRtcEngine
//      */
//     useInitRtcEngine(enableVideo);
//   const [_, setSwitchCamera] = useState(false);
//   const [renderByTextureView, setRenderByTextureView] = useState(false);
//   const [setupMode, setSetupMode] = useState(
//     VideoViewSetupMode.VideoViewSetupReplace,
//   );

//   /**
//    * Step 2: joinChannel
//    */
//   const joinChannel = () => {
//     if (!channelId) {
//       log.error('channelId is invalid');
//       return;
//     }
//     if (uid < 0) {
//       log.error('uid is invalid');
//       return;
//     }

//     // start joining channel
//     // 1. Users can only see each other after they join the
//     // same channel successfully using the same app id.
//     // 2. If app certificate is turned on at dashboard, token is needed
//     // when joining channel. The channel name and uid used to calculate
//     // the token has to match the ones used for channel join
//     engine.current.joinChannel(token, channelId, uid, {
//       // Make myself as the broadcaster to send stream to remote
//       clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//     });
//   };

//   /**
//    * Step 3 (Optional): switchCamera
//    */
//   const _switchCamera = () => {
//     engine.current.switchCamera();
//     setSwitchCamera(prev => !prev);
//   };

//   /**
//    * Step 4: leaveChannel
//    */
//   const leaveChannel = () => {
//     engine.current.leaveChannel();
//   };

//   useEffect(() => {
//     engine.current.addListener(
//       'onVideoDeviceStateChanged',
//       (deviceId: string, deviceType: number, deviceState: number) => {
//         log.info(
//           'onVideoDeviceStateChanged',
//           'deviceId',
//           deviceId,
//           'deviceType',
//           deviceType,
//           'deviceState',
//           deviceState,
//         );
//       },
//     );

//     engine.current.addListener(
//       'onLocalVideoStateChanged',
//       (
//         source: VideoSourceType,
//         state: LocalVideoStreamState,
//         error: LocalVideoStreamReason,
//       ) => {
//         log.info(
//           'onLocalVideoStateChanged',
//           'source',
//           source,
//           'state',
//           state,
//           'error',
//           error,
//         );
//       },
//     );

//     const engineCopy = engine.current;
//     return () => {
//       engineCopy.removeAllListeners();
//     };
//   }, [engine]);

//   return (
//     <BaseComponent
//       name={'JoinChannelVideo'}
//       renderConfiguration={renderConfiguration}
//       renderChannel={() => (
//         <BaseRenderChannel
//           channelId={channelId}
//           joinChannel={joinChannel}
//           leaveChannel={leaveChannel}
//           joinChannelSuccess={joinChannelSuccess}
//           onChannelIdChange={setChannelId}
//         />
//       )}
//       renderUsers={() => (
//         <BaseRenderUsers
//           enableVideo={enableVideo}
//           renderVideo={renderVideo}
//           startPreview={startPreview}
//           joinChannelSuccess={joinChannelSuccess}
//           remoteUsers={remoteUsers}
//         />
//       )}
//       renderAction={renderAction}
//     />
//   );

//   function renderVideo(user: VideoCanvas): ReactElement | undefined {
//     return renderByTextureView ? (
//       <RtcTextureView
//         style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
//         canvas={{...user, setupMode}}
//       />
//     ) : (
//       <RtcSurfaceView
//         style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
//         zOrderMediaOverlay={user.uid !== 0}
//         canvas={{...user, setupMode}}
//       />
//     );
//   }

//   function renderConfiguration(): ReactElement | undefined {
//     return (
//       <>
//         {Platform.OS === 'android' && (
//           <AgoraSwitch
//             disabled={!startPreview && !joinChannelSuccess}
//             title={`renderByTextureView`}
//             value={renderByTextureView}
//             onValueChange={value => {
//               setRenderByTextureView(value);
//             }}
//           />
//         )}
//         <AgoraDivider />
//         <AgoraDropdown
//           title={'setupMode'}
//           items={enumToItems(VideoViewSetupMode)}
//           value={setupMode}
//           onValueChange={value => {
//             setSetupMode(value);
//           }}
//         />
//         {setupMode === VideoViewSetupMode.VideoViewSetupAdd ? (
//           <>
//             <AgoraDivider />
//             {renderByTextureView ? (
//               <RtcTextureView
//                 style={AgoraStyle.videoSmall}
//                 canvas={{uid: 0, setupMode}}
//               />
//             ) : (
//               <RtcSurfaceView
//                 style={AgoraStyle.videoSmall}
//                 canvas={{uid: 0, setupMode}}
//               />
//             )}
//           </>
//         ) : undefined}
//         <AgoraDivider />
//       </>
//     );
//   }

//   function renderAction(): ReactElement | undefined {
//     return (
//       <>
//         <AgoraButton
//           disabled={!startPreview && !joinChannelSuccess}
//           title={`switchCamera`}
//           onPress={_switchCamera}
//         />
//       </>
//     );
//   }
// }

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
import useInitRtcEngine from 'ssss/examples/hook/hooks/useInitRtcEngine';
import {useSnapshot} from 'valtio';
import {
  AppContainer,
  BaseComponent,
  BaseRenderUsers,
  LiveHeader,
  RenderNothing,
} from '~/components';
// import useInitRtcEngine from '~/hooks/agora/useInitRtcEngine';
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
    <AppContainer safeArea={false}>
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
