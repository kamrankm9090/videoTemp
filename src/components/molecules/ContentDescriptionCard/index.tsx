import React, {useState} from 'react';
import {
  AppText,
  AppTouchable,
  HStack,
  LiveCommentSection,
  VStack,
} from '~/components';
import {Colors} from '~/styles';

type Props = {
  title: string;
  description: string;
  category?: string;
  price?: string;
  schedule?: string;
};

const ContentDescriptionCard = ({
  title,
  description,
  category,
  price,
  schedule,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <VStack gap={8} pb={4}>
      <AppText fontSize={18} fontWeight="600">
        {title}
      </AppText>

      <AppText
        fontSize={13}
        fontWeight={400}
        color={Colors.GARY_3}
        numberOfLines={expanded ? undefined : 2}>
        {description}
      </AppText>

      {expanded && (
        <VStack gap={12} mt={4}>
          <HStack justifyContent="space-between">
            <VStack gap={6}>
              <AppText fontSize={13} color={Colors.GARY_4}>
                Category
              </AppText>
              <AppText fontSize={13} fontWeight="bold">
                {category}
              </AppText>
            </VStack>

            <VStack gap={6}>
              <AppText fontSize={13} color={Colors.GARY_4}>
                Price
              </AppText>
              <AppText fontSize={13} fontWeight="bold">
                {price}
              </AppText>
            </VStack>
          </HStack>

          <VStack gap={6}>
            <AppText fontSize={13} color={Colors.GARY_4}>
              Publishing schedule
            </AppText>
            <AppText fontSize={13} fontWeight="bold">
              {schedule}
            </AppText>
          </VStack>
        </VStack>
      )}
      {description.length > 100 && (
        <AppTouchable onPress={toggleExpanded}>
          <AppText fontSize={13} fontWeight="500" color={Colors.PRIMARY}>
            {expanded ? 'show Less...' : 'show more...'}
          </AppText>
        </AppTouchable>
      )}
      {!expanded && <LiveCommentSection />}
    </VStack>
  );
};

export default ContentDescriptionCard;
