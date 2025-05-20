import React from 'react';
import {StyleSheet} from 'react-native';
import {Close2, LiveIcon, MoreIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, Center, HStack} from '~/components';
import {goBack} from '~/navigation/methods';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const ContentViewerHeader = () => {
  return (
    <HStack space={8} mx={16} mt={12}>
      <AppTouchable
        bg={Colors.BLACK_TRANSPARENT_4}
        p={16}
        borderRadius={12}
        onPress={() => goBack()}>
        <Close2 fill={Colors.WHITE} />
      </AppTouchable>

      <HStack flex={1} p={8} rounded={12} bg={Colors.BLACK_TRANSPARENT_4}>
        <HStack space={6} flex={1}>
          <AppImage
            imageSource={{
              uri: 'https://randomuser.me/api/portraits/women/68.jpg',
            }}
            style={styles.image}
          />
          <AppText fontSize={fontSize.small} fontFamily="medium">
            Luna Miller
          </AppText>

          <AppTouchable
            py={4}
            px={10}
            borderRadius={4}
            bg={Colors.BLACK_TRANSPARENT_4}>
            <AppText
              fontSize={fontSize.small}
              fontFamily="medium"
              borderRadius={8}>
              Following
            </AppText>
          </AppTouchable>
        </HStack>

        <HStack space={8}>
          <HStack space={4}>
            <AppText
              fontSize={fontSize.small}
              fontWeight="600"
              color={Colors.WHITE}>
              96
            </AppText>
            <Center w={18} h={18} rounded={9} bg={Colors.PRIMARY}>
              <LiveIcon />
            </Center>
          </HStack>
          <AppTouchable>
            <MoreIcon fill={Colors.WHITE} />
          </AppTouchable>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default ContentViewerHeader;

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
