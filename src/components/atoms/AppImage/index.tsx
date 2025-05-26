import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import images from '~/assets/images';
import {AppIndicator, ZoomViewerModal} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';

const Image = createImageProgress(FastImage);

interface Props {
  imageSource?: FastImageProps['source'];
  style?: FastImageProps['style'];
  containerStyle?: ViewStyle | ViewStyle[];
  zoomable?: boolean;
  resizeMode?: 'cover' | 'center' | 'contain' | 'stretch';
  backgroundColor?: string;
  local?: boolean;
  children?: ReactNode;
  imageSourceArray?: string[];
  errorImage?: string;
  isLoading?: boolean;
  imageStyle?: FastImageProps['style'];
  isCropped?: boolean;
}

const AppImage = forwardRef(
  (
    {
      imageSource,
      style,
      containerStyle = styles.container,
      zoomable = false,
      resizeMode = FastImage.resizeMode.contain,
      backgroundColor = Colors.TRANSPARENT,
      local = false,
      children,
      imageSourceArray,
      errorImage = style?.width < 100 ? images.avatarNoImage : images.noImage,
      isLoading,
      imageStyle = {},
      isCropped = true,
    }: Props,
    ref,
  ) => {
    const [imageZoom, setImageZoom] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorLoading, setErrorLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      onPress(index: any = 0) {
        onPressHandler();
        setCurrentIndex(index);
      },
    }));

    const zooming = imageSource && imageSource !== null && zoomable;

    const bgColor = local
      ? backgroundColor
      : imageSource && imageSource !== null
      ? backgroundColor
      : Colors.WHITE;
    const height = style?.height ?? null;
    const width = style?.width ?? null;
    const borderRadius = style?.borderRadius ?? null;

    const imgSource = errorLoading
      ? errorImage
      : local
      ? imageSource
      : imageSource && imageSource !== null
      ? {
          uri: getFullImageUrl(imageSource),
          priority: FastImage.priority.high,
        }
      : errorImage;

    function onPressHandler() {
      setImageZoom(true);
    }

    function oncloseZoomModal() {
      setImageZoom(false);
    }

    function onErrorLoading() {
      setErrorLoading(true);
    }

    function renderIndicator() {
      return (
        <LoadingContainer bg={Colors.TRANSPARENT}>
          <AppIndicator />
        </LoadingContainer>
      );
    }

    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!zooming || errorLoading}
          onPress={onPressHandler}
          style={[
            containerStyle,
            {
              height,
              width,
              borderRadius,
            },
          ]}>
          <Image
            indicator={renderIndicator}
            imageStyle={imageStyle}
            style={[style, {backgroundColor: bgColor}]}
            source={imgSource}
            onError={onErrorLoading}
            resizeMode={resizeMode}>
            {isLoading && (
              <LoadingContainer>
                <AppIndicator color={Colors.SECONDARY} />
              </LoadingContainer>
            )}
            {children}
          </Image>
        </TouchableOpacity>

        {imageZoom && !errorLoading && (
          <ZoomViewerModal
            {...{
              imageZoom,
              oncloseZoomModal,
              imageSourceArray,
              imageSource,
              currentIndex,
              local,
              isCropped,
              errorImage,
            }}
          />
        )}
      </>
    );
  },
);

export default AppImage;

function LoadingContainer({
  children,
  bg = Colors.BLACK_TRANSPARENT_2,
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <View style={[styles.loadingContainer, {backgroundColor: bg}]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {overflow: 'hidden', alignItems: 'center'},
  cancelIcon: {
    padding: 6,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
