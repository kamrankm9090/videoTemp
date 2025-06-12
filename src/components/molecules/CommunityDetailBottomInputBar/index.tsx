import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {CameraIcon, Close2, MicIcon, Send2Icon} from '~/assets/svgs';
import {
  AppImage,
  AppIndicator,
  AppInput,
  AppTouchable,
  HStack,
} from '~/components';
import { useCommunity_CreateMediaMutation } from '~/graphql/generated';
import {useUploadFile} from '~/hooks';
import {Colors} from '~/styles';

const BottomInputBar = ({onSendMessage, onAttach, onVoice, isLoading,communityId}: any) => {
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage?.(message.trim());
    setMessage('');
    setImageUrl('');
    Keyboard.dismiss();
  };

  const {mutate: uploadFileMutate, isLoading: uploading} = useUploadFile();

  const {mutate} = useCommunity_CreateMediaMutation()
  const handleUpload = (image: any): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      if (!image?.path) {
        reject(new Error('No image selected'));
        return;
      }

      uploadFileMutate(
        {param: image},
        {
          onSuccess: (data: any) => {
            if (data?.uploadedUrl) {
              resolve(data.uploadedUrl);
            } else {
              resolve(undefined);
            }
          },
          onError: error => {
            console.error('Upload failed:', error);
            reject(error);
          },
        },
      );
    });
  };

  const handlePickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.8,
      });
    

      const url = await handleUpload(image);
        mutate({communityId:communityId, mediaUrl: url}, {
        onSuccess(data, variables, context) {
          console.log(data);
          
        },
      })
      if (url) {
        onAttach(url);
        setImageUrl(url);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      style={styles.wrapper}>
      {imageUrl && (
        <HStack justifyContent="space-between" p={12} mx={12} bg={Colors.NIGHT_RIDER} borderRadius={12}>
          <AppImage
            imageSource={imageUrl}
            style={{
              width: 100,
              height: 100,
              margin: 12,
              borderLeftWidth: 4,
              borderColor: Colors.PRIMARY,
            }}
          />
          <Close2 style={{alignSelf:"flex-start"}} onPress={()=> [setImageUrl("") , onAttach("")]} />
        </HStack>
      )}

      <HStack px={12} py={8}>
        <View style={styles.inputContainer}>
          <AppInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            style={styles.input}
            placeholderTextColor={Colors.GARY_3}
            multiline
          />
          <AppTouchable onPress={onVoice}>
            <MicIcon />
          </AppTouchable>
          <AppTouchable onPress={handlePickImage}>
            <CameraIcon />
          </AppTouchable>
        </View>

        <AppTouchable
          onPress={handleSend}
          disabled={!message.trim()}
          style={styles.sendButton}>
          {isLoading ? <AppIndicator color={Colors.Grey}/> : <Send2Icon />}
        </AppTouchable>
      </HStack>
    </KeyboardAvoidingView>
  );
};

export default BottomInputBar;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 0, // tighter vertical space like design
  },
  sendButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    padding: 10,
  },
});
