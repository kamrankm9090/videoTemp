import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {isIos} from '~/utils/helper';

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardShow = isIos ? 'keyboardWillShow' : 'keyboardDidShow';
  const keyboardHide = isIos ? 'keyboardWillHide' : 'keyboardDidHide';

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      keyboardShow,
      event => {
        setKeyboardVisible(true);
        setKeyboardHeight(event.endCoordinates?.height || 0);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(keyboardHide, () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [keyboardShow, keyboardHide]);

  return {isKeyboardVisible, keyboardHeight};
};
