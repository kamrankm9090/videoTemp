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
  AppContainer,
  AppIndicator,
  AppText,
  Box,
  Center,
  HStack,
  VStack,
} from '~/components';
import {navigate} from '~/navigation/methods';
import {uploadFile} from '~/services/fileUploader';
import {Colors} from '~/styles';
import {fontSize, height, width} from '~/utils/style';

const MAX_DURATION = 15; // seconds

const VideoPreviewRecorder = () => {
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
  }, [hasCameraPermission, hasMicrophonePermission]);

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
      <Center flex={1} mt={200} bg={Colors.BLACK}>
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
      }, MAX_DURATION * 1000);
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
    setUploadProgress(0); // Reset progress

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

      navigate('CreateContent', {videoUrl: response.uploadedUrl});
      setVideoUri(null);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', 'There was a problem uploading the video.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <AppContainer>
      {videoUri ? (
        <>
          <Video
            source={{uri: videoUri}}
            style={styles.video}
            controls
            resizeMode="cover"
          />
          <VStack position="absolute" alignSelf="center" bottom={24} space={8}>
            <AppButton
              title={
                uploading ? `Uploading... ${uploadProgress}%` : 'Upload Video'
              }
              onPress={uploadVideo}
              disabled={uploading}
            />

            <AppButton
              title={'Record Again'}
              onPress={() => setVideoUri(null)}
              disabled={uploading}
            />
          </VStack>
        </>
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
          <HStack maxW={200} alignSelf="center" position="absolute" bottom={0}>
            <AppButton
              title={recording ? 'Stop Recording' : `Record (${MAX_DURATION}s)`}
              onPress={recording ? stopRecording : startRecording}
            />
          </HStack>
        </>
      )}
    </AppContainer>
  );
};

export default VideoPreviewRecorder;

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    width: (width / 3) * 2,
    height: height / 2,
    alignSelf: 'center',
    top: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.WHITE_TRANSPARENT_2,
  },
});
