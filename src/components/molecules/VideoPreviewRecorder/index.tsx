import React, {useEffect, useRef, useState} from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {
  AppButton,
  AppIndicator,
  AppText,
  Box,
  Center,
  HStack,
  VStack,
} from '~/components';
import {uploadFile} from '~/services/fileUploader';
import {Colors} from '~/styles';
import {formatTimer} from '~/utils/helper';
import {fontSize, height, width} from '~/utils/style';

type Props = {
  maxDuration?: number;
  onSelectVideo?: (videoUrl: string) => void;
};

export default function VideoPreviewRecorder({
  maxDuration = 15,
  onSelectVideo,
}: Props) {
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    (async () => {
      if (!hasCameraPermission) {
        const granted = await requestCameraPermission();
        if (!granted) {
          Alert.alert(
            'Camera Permission Required',
            'Please allow camera access from settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        }
      }
      if (!hasMicrophonePermission) {
        const micGranted = await requestMicrophonePermission();
        if (!micGranted) {
          Alert.alert(
            'Microphone Permission Denied',
            'You can still record video without sound.',
          );
        }
      }
    })();
  }, [
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  useEffect(() => {
    let interval: any;
    if (recording) {
      setTimer(0); // reset timer at start
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  if (!device || !hasCameraPermission) {
    return (
      <Center flex={1} bg={Colors.BACKGROUND}>
        <AppIndicator size="large" />
      </Center>
    );
  }

  const startRecording = async () => {
    if (!cameraRef.current) {
      return;
    }

    setRecording(true);
    try {
      cameraRef.current.startRecording({
        flash: 'off',
        onRecordingFinished: video => {
          setVideoUri(video.path);
          setRecording(false);
        },
        onRecordingError: error => {
          console.error(error);
          setRecording(false);
        },
      });

      setTimeout(() => {
        stopRecording();
      }, maxDuration * 1000);
    } catch (error) {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  const uploadVideo = async () => {
    if (!videoUri) {
      return;
    }
    setUploading(true);
    setUploadProgress(0);

    try {
      const param = {
        path: videoUri,
        mime: 'video/mp4',
        filename: `video_${Date.now()}.mp4`,
      };

      const response: any = await uploadFile(param, progress => {
        console.log(`Upload Progress: ${progress}%`);
        setUploadProgress(progress);
      });

      if (response.uploadedUrl) {
        onSelectVideo?.(response?.uploadedUrl);
      }
      setVideoUri(null);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', 'There was a problem uploading the video.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  function recordAgain() {
    setVideoUri(null);
  }

  return (
    <>
      {videoUri ? (
        <VStack flex={1} bg={Colors.BACKGROUND}>
          <Video
            source={{uri: videoUri}}
            style={styles.video}
            controls
            resizeMode="cover"
          />
          <VStack position="absolute" alignSelf="center" bottom={24} space={12}>
            <AppButton
              title={
                uploading ? `Uploading... ${uploadProgress}%` : 'Upload Video'
              }
              onPress={uploadVideo}
              disabled={uploading}
            />

            <AppButton
              title={'Record Again'}
              onPress={recordAgain}
              disabled={uploading}
            />
          </VStack>
        </VStack>
      ) : (
        <>
          <Camera
            ref={cameraRef}
            style={styles.preview}
            device={device}
            isActive
            video={true}
            audio={hasMicrophonePermission}
          />
          {recording && (
            <HStack space={8} m={10} position="absolute" top={40} left={20}>
              <Box w={14} h={14} rounded={7} bg={Colors.ERROR} />
              <AppText fontFamily="bold" fontSize={fontSize.large}>
                {formatTimer(timer)}
              </AppText>
            </HStack>
          )}
          <HStack
            w="100%"
            alignSelf="center"
            position="absolute"
            justifyContent="center"
            bottom={24}>
            <AppButton
              width="auto"
              title={recording ? 'Stop Recording' : `Record (${maxDuration}s)`}
              onPress={recording ? stopRecording : startRecording}
            />
          </HStack>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    width: width * 0.75,
    height: height * 0.55,
    alignSelf: 'center',
    top: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.WHITE_TRANSPARENT_2,
  },
});
