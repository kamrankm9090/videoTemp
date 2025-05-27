import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {ViewStyle} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import {AppLoading} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {dismissKeyboard} from '~/utils/utils';

type Props = {
  children?: ReactChildren;
  loading?: boolean;
  backgroundColor?: string;
  style?: ModalProps['style'];
  pt?: ViewStyle['paddingTop'];
  px?: ViewStyle['paddingHorizontal'];
  m?: ViewStyle['margin'];
} & ModalProps;

function ModalContainer(props: Props, ref: ModalRef) {
  const {
    children,
    loading,
    backgroundColor = Colors.BLACK_TRANSPARENT_1,
    style,
    pt,
    px = 24,
    m = 0,
    isVisible,
    ...rest
  } = props;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const {statusBarHeight} = useGetStatusBarHeight();

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = useCallback(() => {
    console.log('jjjj');
    dismissKeyboard();
    setIsModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    dismissKeyboard();
    setIsModalVisible(false);
  }, []);

  const paddingTop = useMemo(() => {
    if (
      statusBarHeight &&
      pt &&
      typeof statusBarHeight === 'number' &&
      typeof pt === 'number'
    ) {
      return statusBarHeight + pt;
    } else {
      return statusBarHeight;
    }
  }, [statusBarHeight, pt]);

  return (
    <Modal
      {...rest}
      style={[
        style,
        {
          backgroundColor,
          paddingTop,
          paddingHorizontal: px,
          margin: m,
        },
      ]}
      isVisible={isModalVisible || isVisible}>
      {loading && <AppLoading />}
      {children}
    </Modal>
  );
}

export default forwardRef(ModalContainer);
