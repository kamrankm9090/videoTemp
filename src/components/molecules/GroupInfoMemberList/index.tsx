import React from 'react';
import {AddCircleIcon} from '~/assets/svgs';
import {AppImage, AppText, AppTouchable, HStack, VStack} from '~/components';
import { userDataStore } from '~/stores';
import {Colors} from '~/styles';


export default function GroupInfoMemberList({item}: any) {
  const userData = userDataStore(state => state?.userData)
  const canEdit =  item?.creator?.id  === userData?.id
  return (
    <VStack mt={20} p={16} gap={16} bg={Colors.NERO} borderRadius={8}>
      {item?.users?.map((member: any) => {
        const isOwner = member.user?.id === item?.creator?.id;

        return (
          <HStack
            key={member.id}
            justifyContent="space-between"
            alignItems="center">
            <HStack alignItems="center" gap={12}>
              {canEdit && !isOwner && (
                <AppTouchable onPress={() => {}}>
                  <AddCircleIcon
                    width={20}
                    height={20}
                    stroke={Colors.DELETE}
                  />
                </AppTouchable>
              )}
              <AppImage
                imageSource={member.user?.photoUrl}
                resizeMode='cover'
                style={{width: 40, height: 40, borderRadius: 20}}
              />
              <VStack gap={4}>
                <AppText fontSize={14} fontWeight="600" color={Colors.WHITE}>
                  {member.user?.fullName}
                </AppText>
                <AppText fontSize={14} fontWeight={'400'} color={Colors.Silver}>
                  {member.user?.profession}
                </AppText>
              </VStack>
            </HStack>

            {isOwner && (
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
        );
      })}
    </VStack>
  );
}
