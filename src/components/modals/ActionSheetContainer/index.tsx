import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Keyboard, StyleSheet, View, ViewStyle} from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';
import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {AppKeyboardAwareScrollView, Box} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';
import {toastConfig} from '~/utils/utils';

type Props = {
  children?: ReactNode;
  snackBarBottom?: number;
  minHeight?: number;
  scrollable?: boolean;
  onClose?: () => void;
  gestureEnabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: KeyboardAwareScrollViewProps['contentContainerStyle'];
  containerStyle?: ActionSheetProps['containerStyle'];
};

function ActionSheetContainer(props: Props, ref: ModalRef) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {statusBarHeight} = useGetStatusBarHeight();
  const insets = useSafeAreaInsets();

  const {
    children,
    minHeight,
    scrollable = true,
    onClose,
    gestureEnabled = true,
    style,
    contentContainerStyle = styles.main,
    containerStyle = styles.container,
  } = props;

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = useCallback(() => {
    Keyboard.dismiss();
    actionSheetRef.current?.show();
  }, []);

  const closeModal = useCallback(() => {
    Keyboard.dismiss();
    onClose?.();
    actionSheetRef.current?.hide({type: 'fade'});
  }, []);

  return (
    <ActionSheet
      safeAreaInsets={insets}
      defaultOverlayOpacity={0.7}
      gestureEnabled={gestureEnabled}
      containerStyle={containerStyle}
      enableGesturesInScrollView={scrollable}
      indicatorStyle={styles.indicator}
      ref={actionSheetRef}
      onClose={closeModal}>
      {scrollable ? (
        <AppKeyboardAwareScrollView
          contentContainerStyle={[contentContainerStyle, {minHeight}]}>
          <>
            {children}
            <Toast config={toastConfig} />
          </>
        </AppKeyboardAwareScrollView>
      ) : (
        <View style={[style, {minHeight}]}>
          {children}
          {isAndroid && <Box bottom={statusBarHeight} />}
          <Toast config={toastConfig} />
        </View>
      )}
    </ActionSheet>
  );
}

export default forwardRef(ActionSheetContainer);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Nero,
    paddingHorizontal: 20,
  },
  main: {
    backgroundColor: Colors.Nero,
  },
  indicator: {
    backgroundColor: Colors.TRANSPARENT,
  },
});
