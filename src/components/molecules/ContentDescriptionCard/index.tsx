import React, {useState} from 'react';
import {
  AppText,
  AppTouchable,
  HStack,
  LiveCommentSection,
  VStack,
} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

type Props = {
  title: string;
  description: string;
  category?: string;
  price?: string;
  schedule?: string;
};

export default function ContentDescriptionCard({
  title,
  description,
  category,
  price,
  schedule,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <VStack space={8} pb={4}>
      <AppText fontSize={fontSize.large} fontFamily="bold">
        {title}
      </AppText>

      <AppText
        fontSize={fontSize.small}
        fontFamily="medium"
        color={Colors.GARY_3}
        numberOfLines={expanded ? undefined : 2}>
        {description}
      </AppText>

      {expanded && (
        <VStack space={12} mt={4}>
          <HStack justifyContent="space-between">
            <VStack space={6}>
              <AppText fontSize={fontSize.small} color={Colors.GARY_4}>
                Category
              </AppText>
              <AppText fontSize={fontSize.small} fontFamily="bold">
                {category}
              </AppText>
            </VStack>

            <VStack gap={6}>
              <AppText fontSize={fontSize.small} color={Colors.GARY_4}>
                Price
              </AppText>
              <AppText fontSize={fontSize.small} fontFamily="bold">
                {price}
              </AppText>
            </VStack>
          </HStack>

          <VStack gap={6}>
            <AppText fontSize={fontSize.small} color={Colors.GARY_4}>
              Publishing schedule
            </AppText>
            <AppText fontSize={fontSize.small} fontFamily="bold">
              {schedule}
            </AppText>
          </VStack>
        </VStack>
      )}
      {description.length > 100 && (
        <AppTouchable onPress={toggleExpanded}>
          <AppText
            fontSize={fontSize.small}
            fontFamily="medium"
            color={Colors.PRIMARY}>
            {expanded ? 'show Less...' : 'show more...'}
          </AppText>
        </AppTouchable>
      )}
      {!expanded && <LiveCommentSection key={2}/>}
    </VStack>
  );
}
