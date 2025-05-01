import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Close2, HotSpot2, ThreePointVertical} from '~/assets/svgs';
import {
  AppImage,
  AppText,
  AppTouchable,
  HStack,
  IconButton,
} from '~/components';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';

type LiveHeaderUserType =
  | {
      photoUrl: string;
      username: string;
    }
  | undefined;

export default function LiveHeader({
  onClose = () => {},
  isOwner = true,
  user,
}: {
  onClose?: () => void;
  isOwner?: boolean;
  user?: LiveHeaderUserType;
}) {
  const insets = useSafeAreaInsets();
  const {userData} = userDataStore(state => state);

  const data: LiveHeaderUserType = useMemo(() => {
    return isOwner
      ? {
          photoUrl: userData?.photoUrl,
          username: userData?.username,
        }
      : user;
  }, [isOwner, userData, user]);

  return (
    <HStack
      py={10}
      px={56}
      zIndex={780}
      top={insets.top}
      space={8}
      alignSelf="center"
      position="absolute"
      justifyContent="center">
      <IconButton onPress={onClose}>
        <Close2 />
      </IconButton>

      <HStack rounded={8} bg={Colors.Nero_2} space={12} py={10} px={12}>
        <AppImage
          imageSource={data?.photoUrl}
          resizeMode="stretch"
          style={styles.avatar}
        />
        <AppText numberOfLines={1} flex={1}>
          {data?.username}
        </AppText>
        <HStack space={4}>
          <AppText>0</AppText>
          <HotSpot2 />
        </HStack>
        <AppTouchable>
          <ThreePointVertical />
        </AppTouchable>
      </HStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
