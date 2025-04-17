import React, {memo} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '~/components/atoms/AppText';
import AppTouchable from '~/components/atoms/AppTouchable';
import {Colors} from '~/styles';

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

const UserCard = memo(({user}: {user: (typeof DATA)[0]}) => (
  <View style={styles.card}>
    <Image source={{uri: user.image}} style={styles.avatar} />
    <AppText padding={8} fontWeight={'700'} style={styles.username}>
      {user.username}
    </AppText>
    <AppText maxWidth={200} numberOfLines={2} padding={16} textAlign='center' color={Colors.WHITE_TRANSPARENT_4}>{user.title}</AppText>
    <AppTouchable  style={styles.followBtn}>
      <AppText fontWeight={"700"}>Follow</AppText>
    </AppTouchable>
  </View>
));

export default function PeopleYouMayKnow() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppText fontFamily="bold" style={styles.titleText}>
          People who may you know
        </AppText>
        <AppText style={styles.seeMore}>See more</AppText>
      </View>
      <FlatList
        horizontal
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => <UserCard user={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleText: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  seeMore: {
    color: Colors.WHITE,
    fontSize: 14,
    opacity: 0.7,
  },
  card: {
    marginRight: 12,
    backgroundColor: Colors.SEMI_BLACK,
    borderRadius: 12,
    alignItems: 'center',
    padding:16
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 35,
    marginBottom: 16,
  },
  username: {
    color: Colors.WHITE,
    marginBottom: 4,
  },

  followBtn: {
    minWidth:100,
    backgroundColor: Colors.PRIMARY,
    alignItems:"center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
 
});
