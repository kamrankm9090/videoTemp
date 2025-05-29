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
import {AppKeyboardAwareScrollView, AppLoading, Box} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';
import {height, width} from '~/utils/style';
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
  indicatorStyle?: ActionSheetProps['indicatorStyle'];
  loadingColor?: ViewStyle['backgroundColor'];
  indicatorBackgroundColor?: ViewStyle['backgroundColor'];
  backgroundColor?: ViewStyle['backgroundColor'];
  isLoading?: boolean;
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
    loadingColor = Colors.WHITE_TRANSPARENT_1,
    indicatorStyle,
    backgroundColor = Colors.Nero,
    indicatorBackgroundColor = Colors.TRANSPARENT,
    isLoading,
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
      containerStyle={{...containerStyle, backgroundColor}}
      enableGesturesInScrollView={scrollable}
      indicatorStyle={{
        ...indicatorStyle,
        backgroundColor: indicatorBackgroundColor,
      }}
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
      {isLoading && (
        <AppLoading
          backgroundColor={loadingColor}
          width={width}
          height="115%"
          top={0}
          bottom={0}
        />
      )}
    </ActionSheet>
  );
}

export default forwardRef(ActionSheetContainer);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  main: {
    backgroundColor: Colors.Nero,
  },
});
