import React from 'react';
import {StyleSheet} from 'react-native';
import {AppImage, AppText, HStack, VStack} from '~/components';
import {Colors} from '~/styles';
import {formatTimeAgo} from '~/utils/helper';

const CommunityDetailItem = ({item}: any) => {
  const isMe = false;
  return (
    <HStack
      justifyContent={isMe ? 'flex-end' : 'flex-start'}
      style={{marginBottom: 12, gap: 8, alignItems: 'flex-end'}}>
      {!isMe && (
        <AppImage
          imageSource={{uri: ''}}
          style={{width: 24, height: 24, alignSelf: 'flex-end'}}
        />
      )}
      <VStack
        bg={isMe ? Colors.BLUE_MESSAGE : Colors.Nero_3}
        p={12}
        borderRadius={12}
        maxW={'80%'}>
        <AppText
          color={Colors.WHITE}
          lineHeight={24}
          fontSize={14}
          fontWeight="400">
          {item?.text} I want to make a film in the field of cosmetics and
          skincare products, and I am currently looking for these skills for
          this project.
        </AppText>
        <AppText
          fontSize={13}
          color={Colors.VeryLightGrey}
          alignSelf="flex-end"
          style={{marginTop: 4}}>
          {formatTimeAgo(item?.timestamp || new Date())}
        </AppText>
      </VStack>
    </HStack>
  );
};

export default CommunityDetailItem;

const styles = StyleSheet.create({});
