import React from 'react';
import {StyleSheet} from 'react-native';
import {ChevronBack, GroupUsersIcon, LockIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles';

const CommunityItem = () => {
  const infoItem = [
    {
      title: '34',
      icon: <GroupUsersIcon />,
    },
    {
      title: 'private',
      icon: <LockIcon />,
    },
  ];

  const ownerButtons = [
    {
      title: 'See more',
      color: Colors.NIGHT_RIDER,
      onPress: () => navigate('CommunityStack', {screen: 'CommunityInfo'}),
    },
    {
      title: 'Requesters +2',
      color: Colors.PRIMARY,
      onPress: () => navigate('CommunityStack', {screen: 'Requesters'}),
    },
  ];
  const othersButtons = [
    {
      title: 'Join community',
      color: Colors.NIGHT_RIDER,
      onPress: () => {},
    },
  ];
  return (
    <AppTouchable
      bg={Colors.Nero}
      p={16}
      gap={16}
      borderRadius={8}
      onPress={() => navigate('CommunityStack', {screen: 'CommunityDetail'})}>
      <HStack gap={8}>
        <AppImage style={styles.imageStyle} imageSource={{uri: ''}} />
        <HStack>
          <AppText fontSize={16} fontWeight={'500'}>
            Beauty Documentary
          </AppText>
          <ChevronBack
            width={16}
            color={'red'}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </HStack>
        <VStack bg={Colors.GARY_3} borderRadius={100} py={4} px={8}>
          <AppText fontSize={12} fontWeight={'400'}>
            Owner
          </AppText>
        </VStack>
      </HStack>
      <AppText
        fontSize={14}
        fontWeight={'400'}
        lineHeight={24}
        color={Colors.VeryLightGrey}>
        I want to make a film in the field of cosmetics and skincare products,
        and I am currently looking for these skills for this project.
      </AppText>
      <HStack justifyContent="space-between">
        {infoItem?.map(i => {
          return (
            <HStack key={i?.title} gap={4}>
              {i?.icon}
              <AppText fontSize={12} fontWeight={'400'}>
                {i?.title}
              </AppText>
            </HStack>
          );
        })}
      </HStack>
      <HStack justifyContent="space-between">
        {(true ? ownerButtons : othersButtons)?.map(i => {
          return (
            <AppTouchable
              py={8}
              px={20}
              bg={i?.color}
              borderRadius={4}
              onPress={i?.onPress}>
              <AppText>{i.title}</AppText>
            </AppTouchable>
          );
        })}
      </HStack>
    </AppTouchable>
  );
};

export default CommunityItem;

const styles = StyleSheet.create({
  imageStyle:{width: 32, height: 32}
});
