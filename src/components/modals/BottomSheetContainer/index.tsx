import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {AppLoading} from '~/components';
import {useKeyboardHeight} from '~/hooks';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {height} from '~/utils/style';
import {dismissKeyboard, toastConfig} from '~/utils/utils';

type Props = {
  children?: ReactChildren;
  loading?: boolean;
  maxPoint?: number;
  minPoint?: number;
  enablePanDownToClose?: BottomSheetProps['enablePanDownToClose'];
  backgroundStyle?: BottomSheetProps['backgroundStyle'];
  statusBarBackgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
} & BottomSheetProps;

function BottomSheetContainer(props: Props, ref: ModalRef) {
  const {
    children,
    loading,
    maxPoint = height * 0.45,
    minPoint = height * 0.25,
    enablePanDownToClose,
    backgroundStyle = styles.backgroundStyle,
    statusBarBackgroundColor = Colors.BLACK_TRANSPARENT_1,
    barStyle = 'light-content',
    ...rest
  } = props;

  const bottomInset = useKeyboardHeight();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => [minPoint, maxPoint], [maxPoint, minPoint]);

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = useCallback(() => {
    dismissKeyboard();
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    dismissKeyboard();
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <>
        <StatusBar
          translucent
          barStyle={barStyle}
          backgroundColor={statusBarBackgroundColor}
        />
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={closeModal}
        />
      </>
    ),
    [closeModal, barStyle, statusBarBackgroundColor],
  );

  return (
    <BottomSheetModal
      {...rest}
      index={1}
      backgroundStyle={backgroundStyle}
      enablePanDownToClose={enablePanDownToClose}
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      bottomInset={isIos ? bottomInset : 0}
      backdropComponent={renderBackdrop}>
      <View style={styles.containerStyle}>
        {children}
        {loading && <AppLoading />}
        <Toast config={toastConfig} />
      </View>
    </BottomSheetModal>
  );
}

export default forwardRef(BottomSheetContainer);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  backgroundStyle: {
    borderTopEndRadius: 48,
    borderTopStartRadius: 48,
  },
});
