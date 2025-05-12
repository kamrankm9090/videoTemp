import React from 'react';
import {StyleSheet} from 'react-native';
import AppImage from '~/components/atoms/AppImage';
import AppText from '~/components/atoms/AppText';
import HStack from '~/components/common/HStack';
import VStack from '~/components/common/VStack';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

const LiveCommentItem = ({item, index}: any) => {
  return (
      <HStack key={index} space={10} my={4} alignItems="flex-start">
        <AppImage
          imageSource={{uri: item?.comment.user?.photoUrl}}
          style={styles.image}
        />
        <VStack space={2} flex={1}>
          <AppText fontSize={13} fontWeight="600">
            @{item?.comment?.user?.username || item?.comment?.user?.fullName}
          </AppText>
          <AppText fontSize={12} fontWeight={400} color={Colors.GARY_2}>
            {item?.comment?.text}
          </AppText>
        </VStack>
      </HStack>
  );
};

export default LiveCommentItem;

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: fontSize.normal,
    paddingVertical: 8,
    borderColor: Colors.GARY_3,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
