import React from 'react';
import {StyleSheet} from 'react-native';
import {AppImage, AppText, HStack, VStack} from '~/components';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {formatTimeAgo} from '~/utils/helper';

const CommunityDetailItem = ({item, isCurrent}: any) => {
  const userDate = userDataStore(state => state?.userData);
  const isMe = userDate?.id === item?.user?.id;
  return (
    <HStack
      justifyContent={isMe ? 'flex-end' : 'flex-start'}
      style={{
        marginBottom: 12,
        gap: 8,
        alignItems: 'flex-end',
        backgroundColor: isCurrent ? Colors.NERO : null,
      }}>
      {!isMe && (
        <AppImage
          imageSource={item?.user?.photoUrl}
          resizeMode="cover"
          style={{
            width: 24,
            height: 24,
            alignSelf: 'flex-end',
            borderRadius: 100,
          }}
        />
      )}
      <VStack
        bg={isMe ? Colors.BLUE_MESSAGE : Colors.Nero_3}
        p={12}
        borderRadius={12}
        maxW={'80%'}>
        {item?.mediaUrl && (
          <AppImage
            imageSource={item?.mediaUrl}
            style={{
              width: 200,
              height: 200,
              borderLeftWidth: 4,
              borderColor: Colors.PRIMARY,
            }}
          />
        )}
        <AppText
          color={Colors.WHITE}
          lineHeight={24}
          fontSize={14}
          fontWeight="400">
          {item?.message}
        </AppText>
        <AppText
          fontSize={13}
          color={Colors.VeryLightGrey}
          alignSelf="flex-end"
          style={{marginTop: 4}}>
          {formatTimeAgo(item?.createdDate || new Date())}
        </AppText>
      </VStack>
    </HStack>
  );
};

export default CommunityDetailItem;

const styles = StyleSheet.create({});
