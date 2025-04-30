import React from 'react';
import {FlatList, Image} from 'react-native';
import {Send2Icon} from '~/assets/svgs';
import {AppInput, AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';

type Comment = {
  id: string;
  username: string;
  message: string;
  avatar?: string;
};

const dummyComments: Comment[] = [
  {
    id: '1',
    username: 'Johnson joy',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    id: '2',
    username: 'Sara902',
    message: 'Hiii micale john',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
  },
  {
    id: '3',
    username: 'Sara902',
    message: 'Hiii micale john',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

const LiveCommentSection = () => {
  return (
    <VStack gap={12} pb={12}>
      <FlatList
        data={dummyComments}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <HStack gap={10} my={4} alignItems="flex-start">
            <Image
              source={{uri: item.avatar}}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                marginTop: 4,
              }}
            />
            <VStack gap={2} flex={1}>
              <AppText fontSize={13} fontWeight="600">
                @{item.username}
              </AppText>
              <AppText fontSize={12} fontWeight={400} color={Colors.GARY_2}>
                {item.message}
              </AppText>
            </VStack>
          </HStack>
        )}
      />

      <HStack alignItems="center" gap={8}>
        <AppInput
          placeholder="Say Something"
          placeholderTextColor={Colors.GARY_5}
          style={{
            flex: 1,
            fontSize: 14,
            paddingVertical: 8,
            borderColor: Colors.GARY_3,
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
          }}
        />
        <AppTouchable
          p={4}
          borderRadius={12}
          borderWidth={1}
          borderColor={Colors.GARY_3}
          px={8}
          py={8}>
          <Send2Icon width={18} height={18} fill={Colors.BLACK} />
        </AppTouchable>
      </HStack>
    </VStack>
  );
};

export default LiveCommentSection;
