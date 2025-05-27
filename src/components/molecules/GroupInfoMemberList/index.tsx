import React from 'react';
import {Image} from 'react-native';
import {AddCircleIcon} from '~/assets/svgs';
import {AppText, AppTouchable, HStack, VStack} from '~/components';
import {Colors} from '~/styles';

// Sample member data structure
const members = [
  {
    id: '1',
    name: 'Liam Clarke',
    role: 'Portrait photographer',
    avatar: {uri: ''}, // replace as needed
    isOwner: true,
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'Videographer',
    avatar: {uri: ''},
    isOwner: false,
  },
];

export default function GroupInfoMemberList() {
  return (
    <VStack mt={20} p={16} gap={16} bg={Colors.NERO} borderRadius={8}>
      {members.map(member => (
        <HStack
          key={member.id}
          justifyContent="space-between"
          alignItems="center">
          {/* Left section: Avatar + Info */}
          <HStack alignItems="center" gap={12}>
            <AppTouchable onPress={() => {}}>
              <AddCircleIcon width={20} height={20} stroke={Colors.DELETE} />
            </AppTouchable>
            <Image
              source={member.avatar}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
            <VStack gap={4}>
              <AppText fontSize={14} fontWeight="600" color={Colors.WHITE}>
                {member.name}
              </AppText>
              <AppText fontSize={14} fontWeight={'400'} color={Colors.Silver}>
                {member.role}
              </AppText>
            </VStack>
          </HStack>

          {/* Right section: Tag or Remove */}
          {member.isOwner && (
            <AppText
              fontSize={12}
              fontWeight="500"
              backgroundColor={Colors.NIGHT_RIDER}
              paddingHorizontal={10}
              paddingVertical={4}
              paddingTop={4}
              borderRadius={3}
              textAlign="center">
              Owner
            </AppText>
          )}
        </HStack>
      ))}
    </VStack>
  );
}
