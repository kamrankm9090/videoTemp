import React, {useState} from 'react';
import {AppText, AppTouchable, VStack} from '~/components';
import {Colors} from '~/styles';

const FULL_DESCRIPTION =
  'Digital Marketing Specialist With 5 Years Of Experience In Campaign Management';

export default function GroupInfoDescription() {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    FULL_DESCRIPTION.length > 60
      ? FULL_DESCRIPTION.substring(0, 60) + '...'
      : FULL_DESCRIPTION;

  return (
    <VStack mt={12} p={16} bg={Colors.NERO} borderRadius={8}>
      <AppText
        fontSize={13}
        fontWeight="500"
        color={Colors.DarkGray}
        marginBottom={8}>
        Description
      </AppText>

      <AppText fontSize={14} lineHeight={20}>
        {expanded ? FULL_DESCRIPTION : shortText}
      </AppText>

      {FULL_DESCRIPTION.length > 60 && (
        <AppTouchable onPress={() => setExpanded(prev => !prev)} mt={4}>
          <AppText fontSize={13} color={Colors.PRIMARY} fontWeight="500">
            {expanded ? 'show less' : 'show more...'}
          </AppText>
        </AppTouchable>
      )}
    </VStack>
  );
}
