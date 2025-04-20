import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppButton,
  AppFlatList,
  AppImage,
  AppLink,
  AppText,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const DATA = [
  {
    id: '1',
    username: '@Johnson joy',
    title: 'Digital Marketing Specialist',
    image: 'https://thispersondoesnotexist.com/', // Replace with your actual image
  },
  {
    id: '2',
    username: '@Johnson joy',
    title: 'Digital Marketing Specialist',
    image: 'https://thispersondoesnotexist.com/',
  },
  // Add more if needed
];

export default function PeopleYouMayKnow() {
  function seeMoreOnPress() {}

  return (
    <VStack space={20}>
      <HStack space={8} px={16}>
        <AppText flex={1} fontSize={fontSize.large} fontFamily="medium">
          People who may you know
        </AppText>
        <AppLink
          text="See more"
          underline={false}
          fontSize={fontSize.small}
          onPress={seeMoreOnPress}
          color={Colors.VeryLightGrey}
        />
      </HStack>
      <AppFlatList
        horizontal
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => <UserCard user={item} />}
        spaceX={20}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </VStack>
  );
}

const UserCard = memo(({user}: {user: (typeof DATA)[0]}) => {
  function followOnPress() {}

  return (
    <VStack
      py={24}
      px={24}
      w={238}
      space={12}
      rounded={12}
      alignItems="center"
      bg={Colors.SEMI_BLACK}>
      <AppImage imageSource={user.image} style={styles.avatar} />
      <AppText fontFamily="medium">{user.username}</AppText>
      <AppText
        flex={1}
        lineHeight={22}
        numberOfLines={2}
        textAlign="center"
        color={Colors.WHITE_TRANSPARENT_4}>
        {user.title}
      </AppText>
      <AppButton
        mt={12}
        width="auto"
        height={32}
        minW={100}
        title="Follow"
        font_family={fontFamily.medium}
        onPress={followOnPress}
      />
    </VStack>
  );
});

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 35,
  },
});
