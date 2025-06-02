import React, {useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import images from '~/assets/images';
import {Colors} from '~/styles';
import {AppImage, AppText, AppTouchable} from '~/components';
import {getAvatarInitial} from '~/utils/helper';

interface AvatarProps {
  uri?: string;
  size?: number;
  style?: ViewStyle;
  borderRadius?: number;
  zoomable?: boolean;
  local?: boolean;
  isLoading?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 60,
  style,
  borderRadius,
  zoomable = false,
  local = false,
  isLoading = false,
  title = 'No image',
  titleStyle = {},
  containerStyle,
  onPress,
}) => {
  const [error, setError] = useState<boolean>(!uri);

  const resolvedBorderRadius = borderRadius ?? size / 2;
  const fallback = !uri || error;
  const imageSource = !fallback ? (local ? {uri} : uri) : undefined;

  const handleError = () => {
    console.log('error');

    setError(true);
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) onPress(event);
  };

  return (
    <AppTouchable
      activeOpacity={0.8}
      disabled={zoomable}
      onPress={handlePress}
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          borderRadius: resolvedBorderRadius,
        },
        containerStyle,
      ]}>
      {!fallback ? (
        <AppImage
          imageSource={imageSource}
          containerStyle={{
            width: size,
            height: size,
            borderRadius: resolvedBorderRadius,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: resolvedBorderRadius,
          }}
          imageStyle={{borderRadius: resolvedBorderRadius}}
          resizeMode="cover"
          zoomable={zoomable}
          local={local}
          errorImage={images.avatarNoImage}
          isLoading={isLoading}
          isCropped
          ref={undefined}
          imageSourceArray={undefined}
          children={undefined}
          backgroundColor={Colors.GRAY_6}
          onErrorLoadingCallback={handleError}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: resolvedBorderRadius,
            },
            style,
          ]}>
          <AppText color={Colors.WHITE} style={[titleStyle]}>
            {getAvatarInitial(title)}
          </AppText>
        </View>
      )}
    </AppTouchable>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: Colors.GRAY_6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallback: {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
