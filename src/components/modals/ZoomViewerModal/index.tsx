import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ModalProps} from 'react-native-modal';
import images from '~/assets/images';
import {
  AppHeader,
  AppLoading,
  ModalContainer,
  RenderNothing,
} from '~/components';
import {useGetStatusBarHeight} from '~/hooks';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {width} from '~/utils/style';

interface Props {
  imageZoom: boolean;
  oncloseZoomModal: ModalProps['onDismiss'];
  imageSourceArray?: string[];
  imageSource?: string;
  currentIndex: number;
  local?: boolean;
  errorImage?: string;
}

export default function ZoomViewerModal({
  imageZoom,
  oncloseZoomModal,
  imageSourceArray,
  imageSource,
  currentIndex,
  local,
  errorImage = images.noImage,
}: Props) {
  const {statusBarHeight} = useGetStatusBarHeight();

  const imageViewerRef = useRef<ImageViewer>();

  function loadingRender() {
    return <AppLoading />;
  }

  function renderImageViewer(props: any) {
    return <FastImage {...props} />;
  }

  return (
    <ModalContainer
      style={styles.main}
      isVisible={imageZoom}
      onDismiss={oncloseZoomModal}>
      <AppHeader
        title={'Image'}
        titleColor={Colors.WHITE}
        backgroundColor={Colors.BACKGROUND}
        backAction
        backActionHandler={oncloseZoomModal}
        position="absolute"
      />
      <View
        style={[
          styles.modalHeader,
          {
            paddingTop: statusBarHeight,
          },
        ]}>
        {/* <TouchableOpacity
          onPress={oncloseZoomModal}
          activeOpacity={0.7}
          style={styles.closeIcon}>
          <CloseCircle
            fill={Colors.WHITE}
            width={verticalScale(24)}
            height={verticalScale(24)}
          />
        </TouchableOpacity> */}
      </View>

      <ImageViewer
        style={styles.imageViewer}
        ref={imageViewerRef}
        index={currentIndex}
        renderImage={renderImageViewer}
        enableSwipeDown
        renderIndicator={RenderNothing}
        loadingRender={loadingRender}
        imageUrls={
          imageSourceArray && imageSourceArray?.length > 0
            ? imageSourceArray
            : [
                local
                  ? {
                      url: '',
                      props: {
                        source: imageSource ? imageSource : errorImage,
                      },
                    }
                  : imageSource
                  ? {
                      url: getFullImageUrl(imageSource),
                    }
                  : {
                      url: '',
                      props: {
                        source: errorImage,
                      },
                    },
              ]
        }
        onSwipeDown={oncloseZoomModal}
      />
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    position: 'absolute',
    right: 16,
    zIndex: 1000,
  },
  closeIcon: {
    padding: 4,
    left: 0,
    marginTop: 10,
  },
  imageViewer: {
    backgroundColor: Colors.BLACK,
  },
  main: {
    flexGrow: 1,
    width: width,
    zIndex: 12,
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
