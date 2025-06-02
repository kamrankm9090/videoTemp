import React from 'react';
import {InviteFriendsCard, PeopleYouMayKnow, VStack} from '~/components';

export default function SectionHomeFooter() {
  return (
    <VStack space={24}>
      <PeopleYouMayKnow />
      <InviteFriendsCard w="auto" />
    </VStack>
  );
}
