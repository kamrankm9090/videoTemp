import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {CameraIcon, MicIcon, Send2Icon} from '~/assets/svgs';
import {AppInput, AppTouchable, HStack} from '~/components';
import {Colors} from '~/styles';

const BottomInputBar = ({onSendMessage, onAttach, onVoice}: any) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage?.(message.trim());
    setMessage('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      style={styles.wrapper}>
      <HStack alignItems="center" px={12} py={8}>
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
          <AppTouchable onPress={onAttach}>
            <CameraIcon />
          </AppTouchable>
        </View>

        <AppTouchable
          onPress={handleSend}
          disabled={!message.trim()}
          style={styles.sendButton}>
          <Send2Icon />
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
    borderColor:Colors.BORDER,
    borderWidth:1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    gap:8
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
